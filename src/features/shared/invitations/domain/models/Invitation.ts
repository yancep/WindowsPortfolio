import { PersonModel } from '@/src/features/persons/data/models/PersonModel';

type InvitationInfo = {
  roleId: string;
  programId?: string;
  positionId?: string;
};

export type Invitation = {
  id: string;
  status: 'CREATED' | 'SENT' | 'RECEIVED' | 'EXPIRED' | 'USED';
  data?: InvitationInfo;
  expiresAt: Date;
  expiresIn?: number;
  hasExpired?: boolean;
  type?: 'PROGRAM' | 'PROJECT';
  createdAt: Date;
  receivedAt?: Date | null;
  renewedAt?: Date | null;
  renewedCount: number;
  sentAt: Date;
  sentCount: number;
  user?: any;
  accessToken: 'string';
  created_at: '2024-05-09T21:46:10.186Z';
  received_at: '2024-05-09T21:46:10.186Z';
  renewed_at: '2024-05-09T21:46:10.186Z';
  renewed_count: 2147483647;
  sent_at: '2024-05-09T21:46:10.186Z';
  sent_count: 2147483647;
  person: PersonModel;
  link: string;
};
