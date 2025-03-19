import { UserModel } from '@/src/features/users/data/models/UserModel';
import { User } from '@/src/features/users/domain/entities/User';

export const UserModelToUser = (userModel: UserModel): User => {
  return {
    id: userModel.id,
    username: userModel.username,
    firstName: userModel.firstName,
    lastName: userModel.lastName,
    email: userModel.email,
    isSuperAdmin: userModel.isSuperAdmin,
    isAdmin: userModel.isAdmin,
    isActive: userModel.isActive,
    person: userModel.person,
    roles: userModel.roles,
    isEnabled: userModel.isEnabled,
    lastLogin: userModel.lastLogin,
  };
};
