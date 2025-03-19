import { InvitationRepository } from '@/src/features/shared/invitations/domain/repositories/InvitationRepository';
import { ErrorData, SuccessData } from '@/src/core/api/errors/HandleResponse';
import { TokenService } from '@/src/core/services/token/token.service';
import { InvitationDataSources } from '@/src/features/shared/invitations/data/data_sources/InvitationDataSources';

export const InvitationRepositoryImpl = (
  invitationDataSources : InvitationDataSources,
  tokenService : TokenService,
) : InvitationRepository => ( {
  getInvitation : async ( id ) => {
	try {
	  const response = await invitationDataSources.getInvitation( id );
	  
	  const session = tokenService.getSessionInCookies();
	  
	  tokenService.setSessionInCookies( {
		...session,
		access : response.accessToken,
	  } );
	  
	  return SuccessData( response );
	} catch ( error ) {
	  return ErrorData( error );
	}
  },
  
  sendInvitation : async ( id ) => {
	try {
	  const response = await invitationDataSources.sendInvitation( id );
	  return SuccessData( response );
	} catch ( error ) {
	  return ErrorData( error );
	}
  },
  
  renewInvitation : async ( id ) => {
	try {
	  const response = await invitationDataSources.renewInvitation( id );
	  
	  return SuccessData( response );
	} catch ( error ) {
	  return ErrorData( error );
	}
  },
  
  deleteInvitation : async ( id ) => {
	try {
	  const response = await invitationDataSources.deleteInvitation( id );
	  return SuccessData( response );
	} catch ( error ) {
	  return ErrorData( error );
	}
  },
} );
