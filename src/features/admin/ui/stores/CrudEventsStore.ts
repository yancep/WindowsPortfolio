/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import { BaseState, CustomPagination } from '@/src/core/api/BaseState';
import { CrudEventModel } from '@/src/features/admin/data/models/crudEventsModel';
import { tracesRepository } from '@/src/features/admin/domain/repositories/TracesRepository';
import {
  ErrorState,
  LoadingState,
  SuccessState,
} from '@/src/core/state/BaseAppState';
import { formatFilters } from '@/src/core/api/services/graphQl.service';
import { Query } from '@/src/core/api/services/url.service';

interface crudEventsStore extends BaseState<CustomPagination<CrudEventModel>> {
  getCrudEvents: (request: Query) => void;

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

export const useCrudEventsStore = create<crudEventsStore>()(
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
    getCrudEvents: async ({ limit, page, search }) => {
      setState(() => LoadingState);

      const filters = formatFilters(getState().filters);

      const response = await tracesRepository.getCrudEvents({
        page: page ? page : getState().data?.meta.currentPage ?? 1,
        limit,
        search,
        filters,
      });

      if (response._tag === 'Right') {
        setState(() => SuccessState(response.right));
      } else {
        setState(() => ErrorState(response.left));
      }
    },
  }),
);
