/* eslint-disable no-unused-vars */
import { Either } from 'fp-ts/Either';
import { User } from '@/src/features/users/domain/entities/User';
import {
  ChangePasswordUserMePayload,
  ChangeUserPasswordPayload,
  UpdateUserMePayload,
} from '../../data/models/payloads';
import { CustomPagination } from '@/src/core/api/BaseState';
import {
  RegisterUserPayload,
  UpdateUserPayload,
} from '@/src/features/authentication/data/models/payloads';
import { injector } from '@/src/ioc/utils/injector';
import { UserDataModuleSymbols } from '@/src/features/users/data/UsersDataModuleSymbols';
import { Query } from '@/src/core/api/services/url.service';

export interface UserRepository {
  createUser: (request: RegisterUserPayload) => Promise<Either<string, User>>;

  getUsers: (request: Query) => Promise<Either<string, CustomPagination<User>>>;

  getUser: (id: string) => Promise<Either<string, User>>;

  registerUser: (request: RegisterUserPayload) => Promise<Either<string, any>>;

  getUserMe: () => Promise<Either<string, User>>;

  updateUserMer: (request: UpdateUserMePayload) => Promise<Either<string, any>>;

  changePasswordUserMe: (
    data: ChangePasswordUserMePayload,
  ) => Promise<Either<string, User>>;

  changeUserPassword: (
    id: string,
    data: ChangeUserPasswordPayload,
  ) => Promise<Either<string, User>>;

  updateUser: (
    id: string,
    request: UpdateUserPayload,
  ) => Promise<Either<string, User>>;

  validateUserField: (
    field: string,
    value: string,
    id?: string,
  ) => Promise<boolean>;
}

export const usersRepository = injector<UserRepository>(
  UserDataModuleSymbols.USERS_REPOSITORY,
);
