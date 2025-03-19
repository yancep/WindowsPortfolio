/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import {
  BaseAppState,
  LoadingState,
  SuccessState,
} from '@/src/core/state/BaseAppState';
import { injector } from '@/src/ioc/utils/injector';
import { SuccessToast } from '@/src/components/toast/SuccessToast';
import { ErrorToast } from '@/src/components/toast/ErrorToast';
import { UserDataModuleSymbols } from '../../data/UsersDataModuleSymbols';
import { UserRepository } from '../../domain/repositories/UsersRepository';
import { ChangePasswordUserMePayload } from '../../data/models/payloads';
import { RegisterUserPayload } from '@/src/features/authentication/data/models/payloads';
import { User } from '@/src/features/users/domain/entities/User';

const userRepository = injector<UserRepository>(
  UserDataModuleSymbols.USERS_REPOSITORY,
);

type Events = {
  setUser: (user: User) => void;
  getUserMe: () => void;
  changePasswordUserMe: (
    request: ChangePasswordUserMePayload,
  ) => Promise<boolean>;

  registerUser: (request: RegisterUserPayload) => Promise<boolean>;
};

export const useUserStore = create<BaseAppState<User> & Events>(
  (setState, getState) => ({
    data: null,
    error: null,
    isLoading: false,
    isEmpty: false,

    setUser: (user) => {
      SuccessState(user);
    },

    getUserMe: async () => {
      setState(LoadingState);
      const response = await userRepository.getUserMe();
      if (response._tag === 'Right')
        setState(() => SuccessState(response.right));
    },

    updateUser: (person: any) => {
      const lastUser = getState().data;

      const user: User = {
        ...lastUser!,
        person: person,
      };

      setState(() => SuccessState(user));
    },

    changePasswordUserMe: async (request) => {
      const response = await userRepository.changePasswordUserMe(request);
      if (response._tag === 'Right') {
        SuccessToast();
        return true;
      } else {
        ErrorToast(response.left);
        return false;
      }
    },

    registerUser: async (request) => {
      const response = await userRepository.registerUser(request);
      if (response._tag === 'Right') {
        SuccessToast();
        return true;
      } else {
        ErrorToast(response.left);
        return false;
      }
    },
  }),
);
