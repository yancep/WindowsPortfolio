/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticationRepository } from '@/src/features/authentication/domain/repositories/AuthenticationRepository';
import { ErrorData, SuccessData } from '@/src/core/api/errors/HandleResponse';
import { handleError } from '@/src/core/api/hooks/handleError';
import { TokenService } from '@/src/core/services/token/token.service';
import { AuthenticationDataSources } from '../data_sources/AuthenticationDataSources';
import { Either } from 'fp-ts/lib/Either';
import { AuthenticationModel } from '../models/AuthenticationModel';
import { AuthenticationModelToAuthentication } from '../mappers/AuthenticationMapper';

export const AuthenticationRepositoryImpl = (
  authenticationDataSources : AuthenticationDataSources,
  tokenService : TokenService,
) : AuthenticationRepository => ( {
  login : async ( request ) => {
	try {
	  const response = await authenticationDataSources.login( request );
	  
	  const auth : AuthenticationModel = response.data;
	  
	  tokenService.setSessionInCookies( {
		access : auth.access,
		refresh : auth.refresh,
		userId : auth.user.id,
		role : auth.user.isAdmin ? 'ADMIN' : 'CLIENT',
	  } );
	  
	  return SuccessData( AuthenticationModelToAuthentication( auth ) );
	} catch ( error : any ) {
	  return ErrorData( error );
	}
  },
  
  logout : async () => {
	try {
	  const access = tokenService.getSessionInCookies()?.refresh;
	  const response = await authenticationDataSources.logout( access! );
	  
	  if ( response ) {
		tokenService.removeSession();
	  }
	  
	  return SuccessData( response );
	} catch ( e ) {
	  return ErrorData( e );
	}
  },
  
  resetPassword : async ( data ) => {
	try {
	  const response = await authenticationDataSources.resetPassword( data );
	  return SuccessData( response );
	} catch ( error : any ) {
	  return ErrorData( 'error' );
	}
  },
  
  validateTokenForResetPassword : async ( request ) => {
	try {
	  const response =
		await authenticationDataSources.validateTokenForResetPassword( request );
	  
	  return SuccessData( response );
	} catch ( error : any ) {
	  return ErrorData( handleError( error ) );
	}
  },
  
  confirmResetPassword : async ( request ) => {
	try {
	  const response =
		await authenticationDataSources.confirmPasswordReset( request );
	  return SuccessData( response );
	} catch ( error : any ) {
	  return ErrorData( handleError( error ) );
	}
  },
  decodeToken : async function ( request ) : Promise<Either<string, any>> {
	try {
	  const response = await authenticationDataSources.decodeToken( request );
	  return SuccessData( response );
	} catch ( error : any ) {
	  return ErrorData( handleError( error ) );
	}
  },
} );
