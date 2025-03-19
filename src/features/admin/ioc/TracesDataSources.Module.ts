import { ContainerModule, interfaces } from 'inversify';
import { applyDependencies } from '@/src/ioc/utils/applyDependencies';
import {
  TracesDataSources,
  TracesDataSourcesImpl,
} from '@/src/features/admin/data/data_sources/TracesDataSources';
import { AdminDataModuleSymbols } from '@/src/features/admin/data/AdminDataModuleSymbols';
import { NetWorkDataModuleSymbols } from '@/src/ioc/common/network.module';

const initializeTracesDataSourcesModule = (bind: interfaces.Bind) => {
  bind<TracesDataSources>(
    AdminDataModuleSymbols.TRACES_DATA_SOURCES,
  ).toConstantValue(
    applyDependencies(TracesDataSourcesImpl, [
      NetWorkDataModuleSymbols.REST_CLIENT,
    ]),
  );
};

export const TracesDataSourcesModule = new ContainerModule(
  initializeTracesDataSourcesModule,
);
