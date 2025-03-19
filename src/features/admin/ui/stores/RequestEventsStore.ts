/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { BaseState, CustomPagination } from '@/src/core/api/BaseState';
import { create } from 'zustand';
import { RequestEventModel } from '@/src/features/admin/data/models/requestEventsModel';
import { Query } from '@/src/core/api/services/url.service';
import { tracesRepository } from '@/src/features/admin/domain/repositories/TracesRepository';
import { formatFilters } from '@/src/core/api/services/graphQl.service';

interface requestEventsStore
  extends BaseState<CustomPagination<RequestEventModel>> {
  getRequestEvents: (request: Query) => void;

  filters: {
    user?: string;
    min_date?: string;
    max_date?: string;
  };
  setFilters: (filters: {
    user?: string;
    min_date?: string;
    max_date?: string;
  }) => void;
}

export const useRequestEventsStore = create<requestEventsStore>()(
  (setState, getState) => ({
    isLoading: false,
    data: null,
    listData: null,
    error: null,
    filters: {
      user: undefined,
      min_date: undefined,
      max_date: undefined,
    },
    setFilters: (filters) => {
      setState(() => ({ filters }));
    },

    getRequestEvents: async ({ page, limit, search }) => {
      setState(() => ({ isLoading: true }));
      const response = await tracesRepository.getRequestEvents({
        page: page ? page : (getState().data?.meta.currentPage ?? 1),
        limit,
        search,
        filters: formatFilters(getState()?.filters),
      });
      if (response._tag === 'Right') {
        setState(() => ({ data: response.right, isLoading: false }));
      } else {
        setState(() => ({ error: response.left, isLoading: false }));
      }
    },
  }),
);
