/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { AxiosInstance } from 'axios';
import { generateUrlAndQuery, Query, } from '@/src/core/api/services/url.service';
import { Invitation } from '../../domain/models/Invitation';

export interface InvitationDataSources {
  getInvitationByUrl: (url: string, query: Query) => Promise<Invitation>;
  getInvitation: (id: string) => Promise<any>;
  sendInvitation: (id: string) => Promise<any>;
  renewInvitation: (id: string) => Promise<any>;
  deleteInvitation: (id: string) => Promise<any>;
}

const VERSION = 1;
const BASE_PATH = 'invitations';

export const InvitationDataSourcesImpl = (
  restClient: AxiosInstance,
): InvitationDataSources => ({
  getInvitation: async function (id) {
    const { path, query } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/${id}/`,
    });

    return (await restClient.get(path)).data;
  },

  getInvitationByUrl: async function (url, { fields }) {
    const { path, query } = generateUrlAndQuery({
      version: VERSION,
      queryFields: fields,
      basePath: url,
    });

    return (await restClient.get(path, { params: { query } })).data;
  },

  sendInvitation: async function (id) {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/${id}/send/`,
    });
    return (await restClient.post(path)).data;
  },

  renewInvitation: async function (id) {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/${id}/renew/`,
    });
    return (await restClient.post(path)).data;
  },

  deleteInvitation: async function (id) {
    const { path } = generateUrlAndQuery({
      version: VERSION,
      basePath: `${BASE_PATH}/${id}/`,
    });
    return (await restClient.delete(path)).data;
  },
});
