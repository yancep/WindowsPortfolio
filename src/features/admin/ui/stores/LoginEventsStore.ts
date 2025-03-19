/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { BaseState, CustomPagination } from '@/src/core/api/BaseState';
import { create } from 'zustand';
import { LoginEventModel } from '@/src/features/admin/data/models/loginEventsModel';
import { Query } from '@/src/core/api/services/url.service';
import { LoadingState } from '@/src/core/state/BaseAppState';
import { formatFilters } from '@/src/core/api/services/graphQl.service';
import { tracesRepository } from '@/src/features/admin/domain/repositories/TracesRepository';

interface loginEventsStore
  extends BaseState<CustomPagination<LoginEventModel>> {
  getLoginEvents: (request: Query) => void;

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

export const useLoginEventsStore = create<loginEventsStore>()(
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

    //Devuelve una lista de usuarios registrados
    getLoginEvents: async ({ page, limit, search }) => {
      setState(() => LoadingState);

      const filters = formatFilters(getState()?.filters);

      const response = await tracesRepository.getLoginEvents({
        page: page ? page : getState().data?.meta.currentPage ?? 1,
        limit,
        search,
        filters,
      });

      if (response._tag === 'Right') {
        setState(() => ({ data: response.right, isLoading: false }));
      } else {
        setState(() => ({ error: response.left, isLoading: false }));
      }
    },
  }),
);
