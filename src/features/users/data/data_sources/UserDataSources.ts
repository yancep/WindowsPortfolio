/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { AxiosInstance } from 'axios';
import {
  generateUrlAndQuery,
  Query,
} from '@/src/core/api/services/url.service';
import { UserModel } from '../models/UserModel';
import {
  ChangePasswordUserMePayload,
  ChangeUserPasswordPayload,
  UpdateUserMePayload,
} from '../models/payloads';
import { BlackListTokenPayload } from '@/src/features/users/data/models/payloads';
import {
  RegisterUserPayload,
  UpdateUserPayload,
} from '@/src/features/authentication/data/models/payloads';

export interface UserDataSources {
  registerUser: (request: RegisterUserPayload) => Promise<any>;
  changeUserPassword: (
    id: string,
    request: ChangeUserPasswordPayload,
  ) => Promise<any>;
  setUserTokenInBlackList: (request: BlackListTokenPayload) => Promise<any>;

  validateUserField: (payload: any) => Promise<any>;

  getUserMe(): Promise<any>;

  updateUserMe(request: UpdateUserMePayload): Promise<any>;

  changePasswordUserMe(request: ChangePasswordUserMePayload): Promise<any>;

  createUser(data: RegisterUserPayload): Promise<any>;

  updateUser(id: string, request: UpdateUserPayload): Promise<any>;

  getUsers(request: Query): Promise<any>;

  getUser(id: string): Promise<any>;
}

const VERSION = 1;
const BASE_PATH = 'users';

export const UserDataSourcesImpl = (
  restClient: AxiosInstance,
): UserDataSources => ({
  getUserMe: function (): Promise<UserModel> {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/me/`,
    });

    return restClient.get(path);
  },

  updateUserMe: function (request): Promise<any> {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/me/`,
    });

    return restClient.patch(path, request);
  },

  changePasswordUserMe: function (request): Promise<any> {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/me/change-password/`,
    });

    return restClient.post(path, request);
  },

  changeUserPassword: function (id, request): Promise<any> {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/${id}/change-password/`,
    });
    return restClient.post(path, request);
  },

  registerUser: function (request: RegisterUserPayload): Promise<any> {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/`,
    });
    return restClient.post(path, request);
  },

  createUser(request) {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/`,
    });
    return restClient.post(path, request);
  },

  getUser(id) {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/${id}/`,
    });
    return restClient.post(path);
  },

  getUsers({ limit, page, search, order, filters }) {
    const { path, query } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/`,
      queryParams: {
        limit,
        page,
        search,
        order,
      },
      filters,
    });
    return restClient.get(path, { params: { query } });
  },

  setUserTokenInBlackList: function (
    request: BlackListTokenPayload,
  ): Promise<any> {
    throw new Error('Function not implemented.');
  },
  updateUser: function (id, request) {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/${id}/`,
    });
    return restClient.patch(path, request);
  },

  validateUserField: async function (payload) {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/validate/`,
    });

    const { data } = await restClient.post(path, payload);

    return data;
  },
});
