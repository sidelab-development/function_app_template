import { Container, SqlQuerySpec } from '@azure/cosmos';
import { User } from '../../entities/user';
import { IPaginationDatabaseOptions, ITotal } from '../../interfaces/pagination';
import { getDbClient } from '../client';
import { CONTAINERS } from '../config';
import { IFindUserParams, IUserRepository } from './interface';

export class UserRepository implements IUserRepository {
  private container: Container;

  constructor() {
    const dbClient = getDbClient();
    this.container = dbClient.container(CONTAINERS.USERS_CONTAINER);
  }

  async create(payload: User): Promise<User> {
    const response = await this.container.items.create(payload);

    return response.resource;
  }

  async findByEmail(email: string): Promise<User> {
    const qr: SqlQuerySpec = {
      query:
      `SELECT * FROM users u
      WHERE u.email = @email`,
      parameters: [
        { name: '@email', value: email }
      ],
    };
    const { resources } = await this.container.items.query<User>(qr).fetchAll();
    return resources[0];
  }

  async findActiveByEmail(email: string): Promise<User> {
    const qr: SqlQuerySpec = {
      query:
      `SELECT u.id, u.name, u.email, u.active
      FROM users u
      WHERE u.email = @email
      AND u.active = true`,
      parameters: [
        { name: '@email', value: email }
      ],
    };
    const { resources } = await this.container.items.query<User>(qr).fetchAll();
    return resources[0];
  }

  async find({ nameOrEmail, userId }: IFindUserParams, { limit, offset }: IPaginationDatabaseOptions): Promise<User[]> {
    const qr: SqlQuerySpec = {
      query:
      `SELECT u.id, u.name, u.email, u.active
        FROM users u
      WHERE (
        CONTAINS(LOWER(u.email), LOWER(@nameOrEmail))
        OR
        CONTAINS(LOWER(u.name), LOWER(@nameOrEmail))
      )
      AND u.id != @userId
      ORDER BY u.name
      OFFSET @offset LIMIT @limit`,

      parameters: [
        { name: '@nameOrEmail', value: nameOrEmail },
        { name: '@userId', value: userId },
        { name: '@limit', value: limit },
        { name: '@offset', value: offset }
      ],
    };
    const { resources } = await this.container.items.query<User>(qr).fetchAll();
    return resources;
  }

  async findTotal({ nameOrEmail, userId }: IFindUserParams): Promise<ITotal> {
    const qr: SqlQuerySpec = {
      query:
      `SELECT COUNT(1) as count
      FROM users u
      WHERE (
        CONTAINS(LOWER(u.email), LOWER(@nameOrEmail))
        OR
        CONTAINS(LOWER(u.name), LOWER(@nameOrEmail))
      )
      AND u.id != @userId`,

      parameters: [
        { name: '@nameOrEmail', value: nameOrEmail },
        { name: '@userId', value: userId }
      ],
    };
    const { resources } = await this.container.items.query(qr).fetchAll();
    return { total: resources[0].count };
  }

  async updateOne(user: User): Promise<User> {
    const { resource: updatedItem } = await this.container
      .item(user.id)
      .replace(user);

    return updatedItem;
  }
}
