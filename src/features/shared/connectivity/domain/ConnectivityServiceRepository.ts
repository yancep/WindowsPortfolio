import { injector } from '@/src/ioc/utils/injector';
import { ServicesDataModuleSymbols } from '@/src/features/shared/Services.Module';

export interface ConnectivityServiceRepository {
  verifyConnection : () => Promise<boolean>;
}

export const connectivityRepository = injector<ConnectivityServiceRepository>(
  ServicesDataModuleSymbols.CONNECTIVITY_REPOSITORY,
);
