/* eslint-disable no-unused-vars */
import { AccessBlacklisted } from '../models/securityAccessBlacklistedModel';
import {
  generateUrlAndQuery,
  Query,
} from '@/src/core/api/services/url.service';
import { CustomPagination } from '@/src/core/api/BaseState';
import { AxiosInstance } from 'axios';

export interface SecurityDataSources {
  getAccessBlacklisted: (
    request: Query,
  ) => Promise<CustomPagination<AccessBlacklisted>>;

  deleteAccessBlacklisted: (id: string) => Promise<any>;
}

const VERSION = 1;
const BASE_PATH = 'access-blacklist';

export const SecurityDataSourcesImpl = (
  restClient: AxiosInstance,
): SecurityDataSources => ({
  getAccessBlacklisted: async function ({
    limit,
    page,
    filters,
    order,
    search,
  }) {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/`,
      queryParams: {
        limit,
        search,
        page,
        order,
      },
      filters,
    });
    return (await restClient.get(path)).data;
  },

  deleteAccessBlacklisted: async function (id) {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/${id}/`,
    });

    return (await restClient.delete(path)).data;
  },
});
