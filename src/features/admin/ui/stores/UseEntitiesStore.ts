/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import {
  BaseAppState,
  EmptyState,
  ErrorState,
  LoadingState,
  SuccessState,
} from '@/src/core/state/BaseAppState';
import { CustomPagination } from '@/src/core/api/BaseState';
import { entityRepository } from '@/src/features/entities/domain/repositories/EntitiesRepository';
import { Entity } from '@/src/features/entities/domain/entities/Entity';
import { Query } from '@/src/core/api/services/url.service';

type Events = {
  getEntities: (request: Query) => void;
};

export const useEntitiesStore = create<
  BaseAppState<CustomPagination<Entity>> & Events
>((setState) => ({
  ...EmptyState,

  getEntities: async (request) => {
    setState(LoadingState);
    const response = await entityRepository.getEntities(request);

    if (response._tag === 'Right') {
      setState(SuccessState(response.right));
    } else {
      setState(ErrorState(response.left));
    }
  },
}));
