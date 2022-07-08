import { BadRequestException, NotFoundException } from 'sidelab-http-exceptions';
import { v4 as uuid } from 'uuid';
import { User } from '../entities/user';
import { USER_EXCEPTIONS_MESSAGES } from '../exceptions/user';
import { IPaginationOptions, IPaginationResponse } from '../interfaces/pagination';
import {
  ICreateUserData, IFindUserParams, IUserRepository
} from '../repositories/user/interface';
import { buildPaginationObject } from './utils/pagination';

export class UserBusiness {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  /**
   * Find all users that name or email matches with provided value
   * @param searchParams IFindUserParams
   * @param paginationOptions IPaginationOptions
   * @returns Paginated list of users
   */
  async findAll(
    { nameOrEmail, userId }: IFindUserParams,
    { page, pageLength }: IPaginationOptions
  ): Promise<IPaginationResponse<User>> {
    const limit = pageLength;
    const offset = (page - 1) * limit;

    const [users, { total }] = await Promise.all([
      this.userRepository.find({ nameOrEmail, userId }, { limit, offset }),
      this.userRepository.findTotal({ nameOrEmail, userId })
    ]);

    const response = buildPaginationObject(users, total, { page, pageLength });
    return response;
  }

  /**
   * Find user by provided email
   * @param email string
   * @returns User data
   */
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException(USER_EXCEPTIONS_MESSAGES.NOT_FOUND);
    return user;
  }

  /**
   * Update user (role and units fields only) with provided data
   * @param email string
   * @param data IUpdateOneUser
   * @returns User updated data
   */
  async updateOne(email: string, data: Partial<User>): Promise<User> {
    const user = await this.findByEmail(email);
    const dataToUpdate = await this.protectUserSensiviteData(user, data);

    const response = await this.userRepository.updateOne(dataToUpdate);
    return response;
  }

  /**
   * Active or deactive user status
   * @param email string
   * @returns User with active status changed
   */
  async activateOrDeactivateUser(email: string): Promise<User> {
    const user = await this.findByEmail(email);
    this.activeOrDeactiveUser(user);

    const response = await this.userRepository.updateOne(user);
    return response;
  }

  /**
   * Create a new user with provided data
   * @param data ICreateUserData
   * @returns User created
   */
  async create(data: ICreateUserData): Promise<User> {
    await this.checkIfUserExists(data.email);
    const user = await this.generateUserToCreate(data);

    const response = await this.userRepository.create(user);
    return response;
  }

  /**
   * Protect user sensible data and allow change only 'role' and 'units' fields
   * @param originalData User
   * @param editedData IUpdateOneUser
   * @returns Updated user
   */
  private async protectUserSensiviteData(originalData: User, editedData: Partial<User>): Promise<User> {
    const dataToUpdate = { ...originalData, ...editedData };
    return dataToUpdate;
  }

  /**
   * Change user active status to the opposite of the current value
   * @param user User
   */
  private activeOrDeactiveUser(user: User): void {
    user.active = !user.active;
  }

  /**
   * Check if user with provided email exists
   * @param email string
   */
  private async checkIfUserExists(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (user) throw new BadRequestException(USER_EXCEPTIONS_MESSAGES.ALREADY_EXISTS);
  }

  /**
   * Generate an user payload object ready to be stored in database
   * @param user ICreateUserData
   * @returns User payload to store in database
   */
  private async generateUserToCreate(user: ICreateUserData): Promise<User> {
    const dataToCreate: User = {
      id: uuid(),
      name: user.name,
      email: user.email,
      active: true,
    };

    return dataToCreate;
  }
}
