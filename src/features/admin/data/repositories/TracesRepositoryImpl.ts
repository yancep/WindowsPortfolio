import { TracesRepository } from '@/src/features/admin/domain/repositories/TracesRepository';
import { TracesDataSources } from '../data_sources/TracesDataSources';
import { ErrorData, SuccessData } from '@/src/core/api/errors/HandleResponse';

/**
 * Implementación del repositorio de CRUD events.
 * @param tracesDataSources
 * @returns {TracesRepository} Una instancia del repositorio de eventos CRUD.
 */
export const TracesRepositoryImpl = (
  tracesDataSources: TracesDataSources,
): TracesRepository => ({
  async getCrudEvents(request) {
    try {
      const response = await tracesDataSources.getCrudEvents(request);
      return SuccessData(response);
    } catch (error: any) {
      return ErrorData(error);
    }
  },

  async getRequestEvents(request) {
    try {
      const response = await tracesDataSources.getRequestEvents(request);
      return SuccessData(response);
    } catch (error: any) {
      return ErrorData(error);
    }
  },

  async getLoginEvents(request) {
    try {
      const response = await tracesDataSources.getLoginEvents(request);
      return SuccessData(response);
    } catch (error: any) {
      return ErrorData(error);
    }
  },
});
