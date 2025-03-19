import { AxiosInstance } from 'axios';
import { generateUrlAndQuery } from '@/src/core/api/services/url.service';

export interface ConnectivityServiceDataSources {
  verifyConnection: () => Promise<any>;
}

export const ConnectivityServiceDataSourcesImpl = (
  restClient: AxiosInstance,
): ConnectivityServiceDataSources => ({
  verifyConnection: async function (): Promise<any> {
    const { path } = generateUrlAndQuery({
      version: 1,
      basePath: 'healthcheck/?format=json',
    });
    return (await restClient.get(path)).data;
  },
});
