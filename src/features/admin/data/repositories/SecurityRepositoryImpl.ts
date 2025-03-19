import { SecurityRepository } from '@/src/features/admin/domain/repositories/SecurityRepository';
import { SecurityDataSources } from '../data_sources/SecurityDataSoruces';
import { ErrorData, SuccessData } from '@/src/core/api/errors/HandleResponse';

/**
 * Implementación del repositorio de seguridad.
 * @param securityDataSources
 * @returns {SecurityRepository} Una instancia del repositorio de seguridad.
 */
export const SecurityRepositoryImpl = (
  securityDataSources: SecurityDataSources,
): SecurityRepository => ({
  async getAccessBlacklisted(request) {
    try {
      const response = await securityDataSources.getAccessBlacklisted(request);

      return SuccessData(response);
    } catch (error) {
      return ErrorData(error);
    }
  },
  async deleteAccessBlacklisted(id) {
    try {
      const response = await securityDataSources.deleteAccessBlacklisted(id);

      return SuccessData(response);
    } catch (error) {
      return ErrorData(error);
    }
  },
});
