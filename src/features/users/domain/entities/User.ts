import { RoleNomenclature } from './types';
import { PersonModel } from '@/src/features/persons/data/models/PersonModel';

export interface User {
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
  lastLogin: string | null;
  isEnabled: boolean;
}
