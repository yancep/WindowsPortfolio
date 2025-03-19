/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Either } from 'fp-ts/Either';
import { Authentication } from '@/src/features/authentication/domain/models/Authentication';
import { AuthenticationRequest } from '@/src/features/authentication/domain/request/AuthenticationRequest';
import {
  DecodeTokenPayload,
  ResetPasswordEmailPayload,
  ResetPasswordPayload,
  ValidateTokenPayload,
} from '@/src/features/users/data/models/payloads';
import { injector } from '@/src/ioc/utils/injector';
import { AuthenticationDataModuleSymbols } from '@/src/features/authentication/ioc/AuthenticationDataModuleSymbols';

export interface AuthenticationRepository {
  login: (
    request: AuthenticationRequest,
  ) => Promise<Either<string, Authentication>>;

  logout: () => Promise<Either<string, any>>;

  resetPassword: (
    request: ResetPasswordEmailPayload,
  ) => Promise<Either<string, any>>;

  validateTokenForResetPassword: (
    request: ValidateTokenPayload,
  ) => Promise<Either<string, any>>;

  confirmResetPassword: (
    request: ResetPasswordPayload,
  ) => Promise<Either<string, any>>;

  decodeToken: (request: DecodeTokenPayload) => Promise<Either<string, any>>;
}

export const authenticationRepository = injector<AuthenticationRepository>(
  AuthenticationDataModuleSymbols.AUTHENTICATION_REPOSITORY,
);
