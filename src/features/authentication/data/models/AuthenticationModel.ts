import { UserModel } from '@/src/features/users/data/models/UserModel';

export type AuthenticationModel = {
  readonly user: UserModel;
  readonly access: string;
  readonly refresh: string;
};
