import { ContainerModule, interfaces } from 'inversify';
import { applyDependencies } from '@/src/ioc/utils/applyDependencies';
import { SecurityRepository } from '@/src/features/admin/domain/repositories/SecurityRepository';
import { SecurityRepositoryImpl } from '@/src/features/admin/data/repositories/SecurityRepositoryImpl';
import { AdminDataModuleSymbols } from '@/src/features/admin/data/AdminDataModuleSymbols';

const initializeSecurityRepositoriesModule = (bind: interfaces.Bind) => {
  bind<SecurityRepository>(
    AdminDataModuleSymbols.SECURITY_REPOSITORY,
  ).toConstantValue(
    applyDependencies(SecurityRepositoryImpl, [
      AdminDataModuleSymbols.SECURITY_DATA_SOURCES,
    ]),
  );
};

export const SecurityRepositoriesModule = new ContainerModule(
  initializeSecurityRepositoriesModule,
);
