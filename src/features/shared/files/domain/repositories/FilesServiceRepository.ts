/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { injector } from '@/src/ioc/utils/injector';
import { FilesServiceSymbols } from '../../ioc/FilesServiceSymbols';

export interface FileServiceRepository {
  uploadFile: (url: string, payload: any) => Promise<any>;
}

export const filesServiceRepository = injector<FileServiceRepository>(
  FilesServiceSymbols.FILES_SERVICE_DATA_SOURCES,
);
