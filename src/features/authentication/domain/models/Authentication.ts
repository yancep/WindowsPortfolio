import { User } from '@/src/features/users/domain/entities/User';

export type Authentication = {
  readonly user: User;
  readonly access: string;
  readonly refresh: string;
};
