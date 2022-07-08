import { User } from '../../../app/entities/user';

const fakeUser: User = {
  id: '1',
  email: 'email@example.com',
  active: true,
  name: 'User',
};

export const generateFakeUser = (): User => JSON.parse(JSON.stringify(fakeUser));
