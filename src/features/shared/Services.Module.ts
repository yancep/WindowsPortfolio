import { ContainerModule, interfaces } from 'inversify';
import { applyDependencies } from '@/src/ioc/utils/applyDependencies';
import {
  NomenclaturesRepository
} from '@/src/features/shared/nomenclatures/domain/repositories/NomenclaturesRepository';
import {
  NomenclaturesRepositoryImpl
} from '@/src/features/shared/nomenclatures/data/repositories/NomenclaturesRepositoryImpl';
import {
  NomenclaturesDataSources,
  NomenclaturesDataSourcesImpl,
} from './nomenclatures/data/data_sources/NomenclaturesDataSources';
import { NetWorkDataModuleSymbols } from '@/src/ioc/common/network.module';
import { ConnectivityServiceRepository } from '@/src/features/shared/connectivity/domain/ConnectivityServiceRepository';

import { InvitationRepository } from '@/src/features/shared/invitations/domain/repositories/InvitationRepository';
import { InvitationRepositoryImpl } from '@/src/features/shared/invitations/data/repositories/InvitationRepositoryImpl';
import {
  ConnectivityServiceRepositoryImpl
} from '@/src/features/shared/connectivity/data/ConnectivityServiceRepositoryImpl';
import {
  InvitationDataSources,
  InvitationDataSourcesImpl,
} from '@/src/features/shared/invitations/data/data_sources/InvitationDataSources';
import {
  ConnectivityServiceDataSources,
  ConnectivityServiceDataSourcesImpl,
} from './connectivity/data/ConnectivityServiceDataSource';
import { TokenServiceSymbols } from '@/src/core/services/token/token.service';

/**
 * @description Symbols for the shared data module.
 */
export const ServicesDataModuleSymbols = {
  INVITATION_DATA_SOURCES : Symbol( 'InvitationRepositoryImpl' ),
  INVITATION_REPOSITORY : Symbol( 'InvitationRepositoryImpl' ),
  
  NOMENCLATURES_DATA_SOURCES : Symbol( 'NomenclaturesDataSourcesImpl' ),
  NOMENCLATURES_REPOSITORY : Symbol( 'NomenclaturesRepositoryImpl' ),
  
  CONNECTIVITY_DATA_SOURCES : Symbol( 'ConnectivityDataSourcesImpl' ),
  CONNECTIVITY_REPOSITORY : Symbol( 'ConnectivityDataSourcesImpl' ),
};

const initializeModule = ( bind : interfaces.Bind ) => {
  bind<NomenclaturesDataSources>(
	ServicesDataModuleSymbols.NOMENCLATURES_DATA_SOURCES,
  ).toConstantValue(
	applyDependencies( NomenclaturesDataSourcesImpl, [
	  NetWorkDataModuleSymbols.REST_CLIENT,
	] ),
  );
  
  bind<InvitationDataSources>(
	ServicesDataModuleSymbols.INVITATION_DATA_SOURCES,
  ).toConstantValue(
	applyDependencies( InvitationDataSourcesImpl, [
	  NetWorkDataModuleSymbols.REST_CLIENT,
	] ),
  );
  
  bind<ConnectivityServiceDataSources>(
	ServicesDataModuleSymbols.CONNECTIVITY_DATA_SOURCES,
  ).toConstantValue(
	applyDependencies( ConnectivityServiceDataSourcesImpl, [
	  NetWorkDataModuleSymbols.REST_CLIENT,
	] ),
  );
  
  bind<ConnectivityServiceRepository>(
	ServicesDataModuleSymbols.CONNECTIVITY_REPOSITORY,
  ).toConstantValue(
	applyDependencies( ConnectivityServiceRepositoryImpl, [
	  ServicesDataModuleSymbols.CONNECTIVITY_DATA_SOURCES,
	] ),
  );
  
  bind<NomenclaturesRepository>(
	ServicesDataModuleSymbols.NOMENCLATURES_REPOSITORY,
  ).toConstantValue(
	applyDependencies( NomenclaturesRepositoryImpl, [
	  ServicesDataModuleSymbols.NOMENCLATURES_DATA_SOURCES,
	] ),
  );
  
  bind<InvitationRepository>(
	ServicesDataModuleSymbols.INVITATION_REPOSITORY,
  ).toConstantValue(
	applyDependencies( InvitationRepositoryImpl, [
	  ServicesDataModuleSymbols.INVITATION_DATA_SOURCES,
	  TokenServiceSymbols.TOKEN_SERVICE,
	] ),
  );
};

export const ServicesModule = new ContainerModule( initializeModule );
