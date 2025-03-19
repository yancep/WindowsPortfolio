import { Either } from 'fp-ts/Either';
import { Invitation } from '@/src/features/shared/invitations/domain/models/Invitation';

export interface InvitationRepository {
  getInvitation : ( id : string ) => Promise<Either<string, Invitation>>;
  renewInvitation : ( id : string ) => Promise<Either<string, string>>;
  deleteInvitation : ( id : string ) => Promise<Either<string, string>>;
  sendInvitation : ( id : string ) => Promise<Either<string, string>>;
}
