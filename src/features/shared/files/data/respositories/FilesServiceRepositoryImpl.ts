import { ErrorData, SuccessData } from '@/src/core/api/errors/HandleResponse';
import { FileServiceRepository } from '../../domain/repositories/FilesServiceRepository';
import { FilesServiceDataSources } from '../data_sources/FilesServiceDataSources';

export const FileServiceRepositoryImpl = (
  filesDataSources: FilesServiceDataSources,
): FileServiceRepository => ({
  uploadFile: async function (url, payload) {
    try {
      const response = await filesDataSources.uploadFile(url, payload);
      return SuccessData(response);
    } catch (error) {
      return ErrorData(error);
    }
  },
});
