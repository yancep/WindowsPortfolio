import { ContainerModule, interfaces } from 'inversify';
import { applyDependencies } from '@/src/ioc/utils/applyDependencies';
import { NetWorkDataModuleSymbols } from '@/src/ioc/common/network.module';
import {
  FilesServiceDataSources,
  FilesServiceDataSourcesImpl,
} from '../data/data_sources/FilesServiceDataSources';
import { FilesServiceSymbols } from './FilesServiceSymbols';

const initializeModule = (bind: interfaces.Bind) => {
  bind<FilesServiceDataSources>(
    FilesServiceSymbols.FILES_SERVICE_DATA_SOURCES,
  ).toConstantValue(
    applyDependencies(FilesServiceDataSourcesImpl, [
      NetWorkDataModuleSymbols.REST_CLIENT,
    ]),
  );
};

export const FilesServiceDataSourcesModule = new ContainerModule(
  initializeModule,
);
