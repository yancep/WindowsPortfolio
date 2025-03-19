/* eslint-disable no-unused-vars */
import { CustomPagination } from '@/src/core/api/BaseState';
import { CrudEventModel } from '@/src/features/admin/data/models/crudEventsModel';
import { LoginEventModel } from '../models/loginEventsModel';
import { RequestEventModel } from '../models/requestEventsModel';
import { AxiosInstance } from 'axios';
import {
  generateUrlAndQuery,
  Query,
} from '@/src/core/api/services/url.service';

export interface TracesDataSources {
  getCrudEvents: (request: Query) => Promise<CustomPagination<CrudEventModel>>;

  getRequestEvents: (
    request: Query,
  ) => Promise<CustomPagination<RequestEventModel>>;

  getLoginEvents: (
    request: Query,
  ) => Promise<CustomPagination<LoginEventModel>>;
}

const VERSION = 1;
const BASE_PATH = 'logs';

export const TracesDataSourcesImpl = (
  restClient: AxiosInstance,
): TracesDataSources => ({
  getCrudEvents: async function ({
    limit,
    search,
    filters,
    order,
    page,
  }): Promise<CustomPagination<CrudEventModel>> {
    const { path, query } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/crud-events/`,
      queryParams: {
        search,
        limit,
        order,
        page,
      },
      filters,
    });

    return (await restClient.get(path, { params: { query } })).data;
  },
  getRequestEvents: async function ({
    limit,
    search,
    filters,
    order,
    page,
  }): Promise<CustomPagination<RequestEventModel>> {
    const { path, query } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/request-events/`,
      queryParams: {
        search,
        limit,
        order,
        page,
      },
      filters,
    });

    return (await restClient.get(path, { params: { query } })).data;
  },
  getLoginEvents: async function ({
    limit,
    search,
    filters,
    order,
    page,
  }): Promise<CustomPagination<LoginEventModel>> {
    const { path, query } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/login-events/`,
      queryParams: {
        search,
        limit,
        order,
        page,
      },
      filters,
    });

    return (await restClient.get(path, { params: { query } })).data;
  },
});
