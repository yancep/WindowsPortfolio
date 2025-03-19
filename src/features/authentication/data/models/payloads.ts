import { SystemRoleNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/SystemRoleNomenclatures';

export type AuthenticationPayload = {
  email : string;
  password : string;
};

export type RegisterUserPayload = {
  person : string;
  roles? : SystemRoleNomenclature[];
  password : string;
  username : string;
  email : string;
  is_enabled? : boolean;
};

export type UpdateUserPayload = {
  is_enabled? : boolean;
};
