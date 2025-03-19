/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { AxiosInstance } from 'axios';
import {
  generateUrlAndQuery,
  Query,
} from '@/src/core/api/services/url.service';
import jsonToFormData from '@/src/core/api/hooks/jsonToFormData';

export interface FilesServiceDataSources {
  uploadFile: (url: string, payload: any) => Promise<any>;
  getDocumentsByUrl: (url: string, query: Query) => Promise<any>;

  getFileByUrl: (url: string) => Promise<any>;
}

const VERSION = 1;

export const FilesServiceDataSourcesImpl = (
  restClient: AxiosInstance,
): FilesServiceDataSources => ({
  uploadFile: async function (url, payload): Promise<any> {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: url,
    });

    return (await restClient.patch(path, jsonToFormData(payload))).data;
  },

  getDocumentsByUrl: async function (url: string, { fields }): Promise<any> {
    const { path, query } = generateUrlAndQuery({
      version: VERSION,
      basePath: url,
      queryFields: fields,
    });
    return (
      await restClient.get(path, {
        params: { query },
      })
    ).data;
  },

  getFileByUrl: async function (url: string): Promise<any> {
    const { path, query } = generateUrlAndQuery({
      version: VERSION,
      basePath: url,
    });
    return (
      await restClient.get(path, {
        responseType: 'arraybuffer',
      })
    ).data;
  },
});
