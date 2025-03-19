import { ContainerModule, interfaces } from 'inversify';
import { applyDependencies } from '@/src/ioc/utils/applyDependencies';
import { NetWorkDataModuleSymbols } from '@/src/ioc/common/network.module';
import { UserDataModuleSymbols } from '../data/UsersDataModuleSymbols';
import { UserRepositoryImpl } from '../data/repositories/UserRespositoryImpl';
import {
  UserDataSources,
  UserDataSourcesImpl,
} from '../data/data_sources/UserDataSources';
import { UserRepository } from './repositories/UsersRepository';

const initializeModule = (bind: interfaces.Bind) => {
  bind<UserDataSources>(
    UserDataModuleSymbols.USERS_DATA_SOURCE,
  ).toConstantValue(
    applyDependencies(UserDataSourcesImpl, [
      NetWorkDataModuleSymbols.REST_CLIENT,
    ]),
  );

  bind<UserRepository>(UserDataModuleSymbols.USERS_REPOSITORY).toConstantValue(
    applyDependencies(UserRepositoryImpl, [
      UserDataModuleSymbols.USERS_DATA_SOURCE,
    ]),
  );
};

export const UserModule = new ContainerModule(initializeModule);
