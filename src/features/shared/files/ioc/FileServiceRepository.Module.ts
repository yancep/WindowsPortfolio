import { ContainerModule, interfaces } from 'inversify';
import { applyDependencies } from '@/src/ioc/utils/applyDependencies';
import { FilesServiceSymbols } from './FilesServiceSymbols';
import { FileServiceRepository } from '../domain/repositories/FilesServiceRepository';
import { FileServiceRepositoryImpl } from '@/src/features/shared/files/data/respositories/FilesServiceRepositoryImpl';

const initializeModule = ( bind : interfaces.Bind ) => {
  bind<FileServiceRepository>(
	FilesServiceSymbols.FILES_SERVICE_REPOSITORY,
  ).toConstantValue(
	applyDependencies( FileServiceRepositoryImpl, [
	  FilesServiceSymbols.FILES_SERVICE_DATA_SOURCES,
	] ),
  );
};

export const FilesServiceRepositoriesModule = new ContainerModule(
  initializeModule,
);
