import { ContainerModule, interfaces } from 'inversify';
import { applyDependencies } from '@/src/ioc/utils/applyDependencies';
import {
  SecurityDataSources,
  SecurityDataSourcesImpl,
} from '@/src/features/admin/data/data_sources/SecurityDataSoruces';
import { AdminDataModuleSymbols } from '@/src/features/admin/data/AdminDataModuleSymbols';
import { NetWorkDataModuleSymbols } from '@/src/ioc/common/network.module';

const initializeSecurityDataSourcesModule = (bind: interfaces.Bind) => {
  bind<SecurityDataSources>(
    AdminDataModuleSymbols.SECURITY_DATA_SOURCES,
  ).toConstantValue(
    applyDependencies(SecurityDataSourcesImpl, [
      NetWorkDataModuleSymbols.REST_CLIENT,
    ]),
  );
};

export const SecurityDataSourcesModule = new ContainerModule(
  initializeSecurityDataSourcesModule,
);
