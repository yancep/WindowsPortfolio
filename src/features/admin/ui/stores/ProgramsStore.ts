/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { Program } from '@/src/features/programs/domain/entities/Program';
import { formatNumber } from '@/src/core/common/utils/utils';
import { SuccessToast } from '@/src/components/toast/SuccessToast';
import { ErrorToast } from '@/src/components/toast/ErrorToast';
import {
  BaseAppState,
  ErrorState,
  LoadingState,
  SuccessState,
} from '@/src/core/state/BaseAppState';
import { programRepository } from '@/src/features/programs/domain/repositories/ProgramsRepository';
import {
  ProgramPayload,
  SPP_ProgramUpdatePayload,
} from '@/src/features/programs/data/payloads/ProgramPayload';
import { Query } from '@/src/core/api/services/url.service';

export type Events = {
  getPrograms: (request?: Query) => void;
  registerProgram: (request: ProgramPayload) => void;
  updateProgram: (id: string, request: SPP_ProgramUpdatePayload) => void;
};

export const ProgramsStore = create<BaseAppState<Program[]> & Events>(
  (setState, getState) => ({
    ...LoadingState,

    getPrograms: async (request = {}) => {
      setState(LoadingState); // Use LoadingState function here
      const response = await programRepository.getPrograms(request);

      if (response._tag === 'Right') {
        setState(SuccessState(response.right)); // Use SuccessState function here
      } else {
        setState(ErrorState(response.left)); // Use ErrorState function here
      }
    },

    registerProgram: async (data) => {
      const response = await programRepository.registerProgram(data);

      if (response._tag === 'Right') {
        setState((state) =>
          SuccessState([...(state.data ?? []), response.right.data]),
        );
        SuccessToast();
      } else {
        ErrorToast(response.left);
      }
    },

    updateProgram: async (id, data) => {
      const response = await programRepository.updateProgram(id, data);

      if (response._tag === 'Right') {
        const state = getState();
        const updatedProgram = response.right;
        updatedProgram.budget = formatNumber(updatedProgram.budget);
        setState(
          SuccessState(
            state.data?.map((p) => (p.id === id ? updatedProgram : p)) ?? [],
          ),
        );
        SuccessToast();
      } else {
        ErrorToast(response.left);
      }
    },
  }),
);
