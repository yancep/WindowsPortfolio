/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorData, SuccessData } from '@/src/core/api/errors/HandleResponse';
import { UserModelToUser } from '@/src/features/users/data/mappers/mapper';
import { UserDataSources } from '@/src/features/users/data/data_sources/UserDataSources';
import { UserRepository } from '@/src/features/users/domain/repositories/UsersRepository';

export const UserRepositoryImpl = (
  userDataSources: UserDataSources,
): UserRepository => ({
  // USER ME
  async getUserMe() {
    try {
      const response = await userDataSources.getUserMe();

      return SuccessData(response.data);
    } catch (error) {
      return ErrorData(error);
    }
  },

  updateUserMer: async function (request) {
    try {
      const response = await userDataSources.updateUserMe(request);

      return SuccessData(UserModelToUser(response.data));
    } catch (error) {
      return ErrorData(error);
    }
  },

  getUser: async function (id) {
    try {
      const response = await userDataSources.getUser(id);

      return SuccessData(UserModelToUser(response.data));
    } catch (error) {
      return ErrorData(error);
    }
  },

  async changePasswordUserMe(data) {
    try {
      const response = await userDataSources.changePasswordUserMe(data);

      return SuccessData(response.data);
    } catch (error) {
      return ErrorData(error);
    }
  },

  //USER-API
  async updateUser(id, data) {
    try {
      const response = await userDataSources.updateUser(id, data);

      return SuccessData(UserModelToUser(response.data));
    } catch (error) {
      return ErrorData(error);
    }
  },

  registerUser: async (data) => {
    try {
      const response = await userDataSources.registerUser(data);

      return SuccessData(response.data);
    } catch (error) {
      return ErrorData(error);
    }
  },

  async getUsers(request) {
    try {
      const response = await userDataSources.getUsers(request);

      return SuccessData(response.data);
    } catch (error: any) {
      return ErrorData(error);
    }
  },

  async createUser(data) {
    try {
      const response = await userDataSources.createUser(data);
      return SuccessData(response.data);
    } catch (error: any) {
      return ErrorData(error);
    }
  },

  //ADMIN-CHANGE-USER_INGO
  async changeUserPassword(id, request) {
    try {
      const response = await userDataSources.changeUserPassword(id, request);

      return SuccessData(response.data);
    } catch (error: any) {
      return ErrorData(error);
    }
  },

  validateUserField: async function (field, value, id) {
    try {
      const payload = {
        id,
        [field]: value,
      };
      const response = await userDataSources.validateUserField(payload);

      if (response) {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  },
});
