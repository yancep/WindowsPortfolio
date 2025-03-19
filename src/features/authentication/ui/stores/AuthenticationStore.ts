/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { SuccessToast } from '@/src/components/toast/SuccessToast';
import { ErrorToast } from '@/src/components/toast/ErrorToast';
import { createSelectorsWrapper } from '@/src/core/state/ConfigSelectors';
import { showToast } from '@/src/components/toast/Toast';
import {
  ResetPasswordEmailPayload,
  ResetPasswordPayload,
  ValidateTokenPayload,
} from '@/src/features/users/data/models/payloads';
import { User } from '@/src/features/users/domain/entities/User';
import { authenticationRepository } from '@/src/features/authentication/domain/repositories/AuthenticationRepository';

type Actions = {
  login : ( data : { email : string; password : string } ) => Promise<User | null>;
  logout : () => Promise<boolean>;
};

type ResetPasswordActions = {
  confirmResetPassword : ( request : ResetPasswordPayload ) => Promise<boolean>;
  resetPassword : ( request : ResetPasswordEmailPayload ) => void;
  validateToken : ( request : ValidateTokenPayload ) => Promise<boolean>;
};

export const useAuthenticationStore = create<Actions & ResetPasswordActions>(
  () => ( {
	
	login : async ( request ) => {
	  const response = await authenticationRepository.login( request );
	  
	  if ( response._tag === 'Right' ) {
		return response?.right.user;
	  } else {
		ErrorToast( response.left );
		return null;
	  }
	},
	
	logout : async () => {
	  const response = await authenticationRepository.logout();
	  if ( response._tag === 'Left' ) {
		showToast( response.left, 'error' );
		return false;
	  } else {
		return true;
	  }
	},
	
	resetPassword : async ( request ) => {
	  const response = await authenticationRepository.resetPassword( request );
	  
	  if ( response._tag === 'Right' ) {
		showToast(
		  `Las instrucciones para el restablecimiento de la contraseña han sido enviadas al correo ${ request.email }.`,
		  'success',
		);
	  } else {
		ErrorToast( `No se encontró una cuenta asociada al correo: ${ request.email }, pruebe un correo diferente.` );
	  }
	},
	
	validateToken : async ( request ) => {
	  const response =
		await authenticationRepository.validateTokenForResetPassword( request );
	  if ( response._tag === 'Right' ) {
		return true;
	  } else {
		showToast(
		  'El token de recuperación es inválido. Usted será redireccionado al inicio de sesión.',
		  'error',
		  1200,
		);
		return false;
	  }
	},
	confirmResetPassword : async ( request ) => {
	  const response =
		await authenticationRepository.confirmResetPassword( request );
	  
	  if ( response._tag === 'Right' ) {
		SuccessToast();
		return true;
	  } else {
		ErrorToast( response.left );
		return false;
	  }
	},
  } ),
);

export const AuthenticationSelectionsStore = createSelectorsWrapper(
  useAuthenticationStore,
);
