/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { injector } from '@/src/ioc/utils/injector';
import { InvitationRepository } from '@/src/features/shared/invitations/domain/repositories/InvitationRepository';
import { BaseState } from '@/src/core/api/BaseState';
import { showToast } from '@/src/components/toast/Toast';
import { Invitation } from '@/src/features/shared/invitations/domain/models/Invitation';
import { ServicesDataModuleSymbols } from '@/src/features/shared/Services.Module';

const invitationsRepository = injector<InvitationRepository>(
  ServicesDataModuleSymbols.INVITATION_REPOSITORY,
);

type InvitationsActions = {
  getInvitation : ( id : string ) => void;
  renewInvitation : ( id : string ) => void;
  deleteInvitation : ( id : string ) => void;
  sendInvitation : ( id : string ) => Promise<boolean>;
};

type InvitationsState = BaseState<Invitation>;

export const useInvitationStore = create<InvitationsActions & InvitationsState>(
  ( setState ) => ( {
	isLoading : true,
	data : null,
	error : null,
	
	getInvitation : async ( id ) => {
	  const response = await invitationsRepository.getInvitation( id );
	  
	  if ( response._tag === 'Right' ) {
		console.log( response.right );
		setState( () => ( { data : response.right, isLoading : false } ) );
	  } else {
		showToast( response.left, 'error' );
	  }
	},
	renewInvitation : async ( id ) => {
	  const invitation = await invitationsRepository.renewInvitation( id );
	  console.log( invitation );
	  
	  if ( invitation._tag === 'Right' ) {
		showToast( 'La invitación ha sido renovada', 'success' );
	  } else {
		showToast( invitation.left, 'error' );
	  }
	},
	deleteInvitation : async ( id ) => {
	  const invitation = await invitationsRepository.deleteInvitation( id );
	  if ( invitation._tag === 'Right' ) {
		showToast( 'La invitación ha sido eliminada', 'success' );
	  } else {
		showToast( invitation.left, 'error' );
	  }
	},
	sendInvitation : async ( id ) => {
	  const invitation = await invitationsRepository.sendInvitation( id );
	  if ( invitation._tag === 'Right' ) {
		showToast( 'La invitación ha sido enviada', 'success' );
		return true;
	  } else {
		showToast( invitation.left, 'error' );
		return false;
	  }
	},
  } ),
);
