/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../../../app/entities/user';
import { IPaginationDatabaseOptions, ITotal } from '../../../app/interfaces/pagination';
import { IFindUserParams, IUserRepository } from '../../../app/repositories/user/interface';
import { generateFakeUser } from '../entities/user';

export class FakeUserRepository implements IUserRepository {
  async create(payload: User): Promise<User> {
    return payload;
  }

  async findActiveByEmail(email: string): Promise<User> {
    const fakeUser = generateFakeUser();
    fakeUser.email = email;
    return fakeUser;
  }

  async findByEmail(email: string): Promise<User> {
    const fakeUser = generateFakeUser();
    fakeUser.email = email;
    return fakeUser;
  }

  async updateOne(data: User): Promise<User> {
    return data;
  }

  async findTotal(_params: IFindUserParams): Promise<ITotal> {
    return { total: 1 };
  }

  async find(_params: IFindUserParams, _paginationOptions: IPaginationDatabaseOptions): Promise<User[]> {
    const fakeUser = generateFakeUser();
    return [fakeUser];
  }
}
