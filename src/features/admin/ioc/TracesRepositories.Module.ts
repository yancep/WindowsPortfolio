import { ContainerModule, interfaces } from 'inversify';
import { applyDependencies } from '@/src/ioc/utils/applyDependencies';
import { TracesRepository } from '@/src/features/admin/domain/repositories/TracesRepository';
import { TracesRepositoryImpl } from '@/src/features/admin/data/repositories/TracesRepositoryImpl';
import { AdminDataModuleSymbols } from '@/src/features/admin/data/AdminDataModuleSymbols';

const initializeTracesRepositoriesModule = (bind: interfaces.Bind) => {
  bind<TracesRepository>(
    AdminDataModuleSymbols.TRACES_REPOSITORY,
  ).toConstantValue(
    applyDependencies(TracesRepositoryImpl, [
      AdminDataModuleSymbols.TRACES_DATA_SOURCES,
    ]),
  );
};

export const TracesRepositoriesModule = new ContainerModule(
  initializeTracesRepositoriesModule,
);
