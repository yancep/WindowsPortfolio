/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { BaseState, CustomPagination } from '@/src/core/api/BaseState';
import { SuccessToast } from '@/src/components/toast/SuccessToast';
import { securityRepository } from '@/src/features/admin/domain/repositories/SecurityRepository';
import { AccessBlacklisted } from '@/src/features/admin/data/models/securityAccessBlacklistedModel';
import { Query } from '@/src/core/api/services/url.service';
import { ErrorToast } from '@/src/components/toast/ErrorToast';

interface securityStore extends BaseState<CustomPagination<AccessBlacklisted>> {
  getAccessBlacklisted: (request: Query) => void;
  deleteAccessBlacklisted: (id: string) => Promise<boolean>;
}

export const useSecurityStore = create<securityStore>()(
  (setState, getState) => ({
    isLoading: false,
    data: null,
    listData: null,
    error: null,

    //Devuelve una lista de usuarios registrados
    getAccessBlacklisted: async ({ page }) => {
      setState(() => ({ isLoading: true }));
      const response = await securityRepository.getAccessBlacklisted({
        page: page,
      });
      if (response._tag === 'Right') {
        setState(() => ({ data: response.right, isLoading: false }));
      } else {
        setState(() => ({ error: response.left, isLoading: false }));
      }
    },

    deleteAccessBlacklisted: async (id) => {
      const response = await securityRepository.deleteAccessBlacklisted(id);
      if (response._tag === 'Left') {
        ErrorToast(response.left);
        return false;
      } else {
        SuccessToast();
        return true;
      }
    },
  }),
);
