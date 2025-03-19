import React from "react";
import { UserForm } from "@/src/features/users/ui/components/forms/UserForm";
import { User as CurrentUser } from "@/src/features/users/domain/entities/User";

export default function PersonalInformationSection(
  {
	user,
  } : {
	user : CurrentUser;
  } ) {
  
  
  return (
	<div className={ 'flex flex-col w-full h-full space-y-4' }>
	  <span className={ 'text-2xl font-semibold' }>Informacion personal</span>
	  { user.person
		? <UserForm user={ user }/>
		: <span>El usuario no tiene una persona asociada</span>
	  }
	</div>
  )
}