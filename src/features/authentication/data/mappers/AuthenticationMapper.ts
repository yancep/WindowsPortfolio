import { UserModelToUser } from '@/src/features/users/data/mappers/mapper';
import { AuthenticationModel } from '../models/AuthenticationModel';
import { Authentication } from '@/src/features/authentication/domain/models/Authentication';

export const AuthenticationModelToAuthentication = (
  model: AuthenticationModel,
): Authentication => {
  return {
    user: UserModelToUser(model.user),
    access: model.access,
    refresh: model.refresh,
  };
};
