import { PersonModel } from '@/src/features/persons/data/models/PersonModel';
import { RoleNomenclature } from '../../domain/entities/types';

export interface UserModel {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isActive: boolean;
  person?: PersonModel;
  roles: RoleNomenclature[];
  isEnabled: boolean;
  lastLogin: string;
}
