import { User } from '../../entities/user';
import { IPaginationDatabaseOptions, ITotal } from '../../interfaces/pagination';

export type ICreateUserData = Pick<User, 'name' | 'email' >
export type IFindUserParams = {
  userId: string;
  nameOrEmail: string;
  role?: string
}

export interface IUserRepository {
  create(payload: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findActiveByEmail(email: string): Promise<User>;
  find(params: IFindUserParams, paginationOptions: IPaginationDatabaseOptions): Promise<User[]>;
  findTotal(params: IFindUserParams): Promise<ITotal>;
  updateOne(data: User): Promise<User>
}
