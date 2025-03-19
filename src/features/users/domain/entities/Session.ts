import { UserRole } from './types';

export interface SessionModel {
  readonly access?: string;
  readonly refresh?: string;
  readonly userId?: string;
  readonly role?: UserRole;
}
