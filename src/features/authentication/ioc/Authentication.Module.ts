import { ContainerModule, interfaces } from 'inversify';
import { AuthenticationRepository } from '@/src/features/authentication/domain/repositories/AuthenticationRepository';
import { AuthenticationRepositoryImpl } from '@/src/features/authentication/data/repositories/AuthenticationRepositoryImpl';
import { AuthenticationDataModuleSymbols } from '@/src/features/authentication/ioc/AuthenticationDataModuleSymbols';
import { applyDependencies } from '@/src/ioc/utils/applyDependencies';
import { NetWorkDataModuleSymbols } from '@/src/ioc/common/network.module';
import {
  AuthenticationDataSources,
  AuthenticationDataSourcesImpl,
} from '../data/data_sources/AuthenticationDataSources';
import { TokenServiceSymbols } from '@/src/core/services/token/token.service';

const initializeModule = (bind: interfaces.Bind) => {
  bind<AuthenticationDataSources>(
    AuthenticationDataModuleSymbols.AUTHENTICATION_DATA_SOURCES,
  ).toConstantValue(
    applyDependencies(AuthenticationDataSourcesImpl, [
      NetWorkDataModuleSymbols.REST_CLIENT,
    ]),
  );

  bind<AuthenticationRepository>(
    AuthenticationDataModuleSymbols.AUTHENTICATION_REPOSITORY,
  ).toConstantValue(
    applyDependencies(AuthenticationRepositoryImpl, [
      AuthenticationDataModuleSymbols.AUTHENTICATION_DATA_SOURCES,
      TokenServiceSymbols.TOKEN_SERVICE,
    ]),
  );
};

export const AuthenticationModule = new ContainerModule(initializeModule);
