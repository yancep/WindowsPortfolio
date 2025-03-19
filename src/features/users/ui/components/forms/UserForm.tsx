import { useFormik } from 'formik';
import PersonProfessionalInformationForm from '@/src/features/persons/ui/components/PersonProfessionalInformationForm';
import { CustomAsyncButton } from '@/src/components/buttons/CustomAsyncButton';
import * as Yup from 'yup';
import { Spacer } from "@heroui/react";
import { numberValidation } from '@/src/core/common/validations/defaultValidations';
import {
  bankAccountValidation,
  emailValidation,
  nameAndLastNameValidation,
  phoneValidation,
} from '@/src/core/common/validations/personValidations';
import CustomTextInput from '@/src/components/inputs/basic/CustomTextInput';
import { EMAIL_PLACEHOLDER } from '@/src/components/inputs/const/placeholder';
import { EMAIL_LABEL } from '@/src/components/inputs/const/labels';
import { usePersonStore } from '@/src/features/persons/ui/stores/PersonsStore';
import { useProgramStore } from '@/src/features/programs/ui/layouts/stores/useProgramStore';
import { useUserStore } from '@/src/features/users/ui/store/useUserStore';
import { User as CurrentUser } from '@/src/features/users/domain/entities/User';
import { sanitizeValue } from '@/src/core/common/utils/utils';
import { useProjectStore } from '@/src/features/projects/ui/layout/stores/useProjectStore';


export function UserForm(
  {
	user,
  } : {
	user : CurrentUser;
  } ) {
  
  const { data : program, getProgram } = useProgramStore();
  const { data : project, getProject } = useProjectStore();
  
  const { setUser } = useUserStore();
  const { updatePerson } = usePersonStore();
  
  const form = useFormik( {
	validationSchema : Yup.object().shape( {
	  email : emailValidation( user.person!.id! ),
	  phone : phoneValidation( user.person!.id! ),
	  bankAccount : bankAccountValidation( user.person!.id! ),
	  identityCard : numberValidation,
	  firstName : nameAndLastNameValidation,
	  lastName : nameAndLastNameValidation,
	} ),
	initialValues : {
	  identityCard : user?.person?.identityCard ?? null,
	  lastName : user?.person?.lastName ?? null,
	  firstName : user?.person?.name ?? null,
	  email : user?.person?.email ?? null,
	  personId : user?.person?.id ?? null,
	  bankAccount : user?.person?.bankAccount ?? null,
	  phone : user?.person?.phone ?? null,
	  scientificCategory : user?.person?.scientificCategory ?? null,
	  scientificDegree : user?.person?.scientificDegree ?? null,
	  educationalCategory : user?.person?.educationalCategory ?? null,
	  academicDegree : user?.person?.academicDegree ?? null,
	  technologyCategory : user?.person?.technologyCategory ?? null,
	},
	onSubmit : async ( values ) => {
	  const person = await updatePerson( values.personId!, {
		identityCard : values.identityCard!,
		lastName : values.lastName!,
		name : values.firstName!,
		email : values.email!,
		bankAccount : values.bankAccount!,
		phone : values.phone!,
		scientificCategory : sanitizeValue( values.scientificCategory ),
		scientificDegree : sanitizeValue( values.scientificDegree ),
		educationalCategory : sanitizeValue( values.educationalCategory ),
		academicDegree : sanitizeValue( values.academicDegree ),
		technologyCategory : sanitizeValue( values.technologyCategory ),
	  } );
	  if ( person ) {
		user.person = person;
		setUser( user );
		if ( program ) {
		  getProgram( program.id );
		}
		if ( project ) {
		  await getProject( project.project.id! );
		}
	  }
	},
  } );
  return (
	<form onSubmit={ form.handleSubmit }
		  className={ 'flex flex-col  space-y-2 overflow-y-auto h-full w-full justify-between' }>
	  <div className={ 'flex flex-col  space-y-2 overflow-y-auto h-full w-full ' }>
		<CustomTextInput
		  form={ form }
		  formKey={ 'identityCard' }
		  label={ 'Carnet de identidad' }
		  placeholder={ 'Carnet de identidad' }
		  isRequired={ true }
		/>
		<CustomTextInput
		  form={ form }
		  formKey="firstName"
		  placeholder="Nombre"
		  label="Nombre"
		  isRequired={ true }
		/>
		<CustomTextInput
		  form={ form }
		  formKey="lastName"
		  placeholder="Apellidos"
		  label="Apellidos"
		  isRequired={ true }
		/>
		<div className="flex flex-row">
		  <CustomTextInput
			form={ form }
			formKey="email"
			placeholder={ EMAIL_PLACEHOLDER }
			label={ EMAIL_LABEL }
			isRequired={ true }
		  />
		  <Spacer/>
		  <CustomTextInput
			form={ form }
			formKey={ 'phone' }
			label={ 'Teléfono' }
			isRequired={ true }
			inputType={ 'phone' }
		  />
		</div>
		<CustomTextInput
		  inputType={ 'bankAccount' }
		  form={ form }
		  formKey={ 'bankAccount' }
		  label={ 'Cuenta bancaria' }
		  isRequired={ true }
		/>
		<PersonProfessionalInformationForm personInformationForm={ form }/>
	  </div>
	  <div className={ 'bottom-0 flex flex-row justify-end items-center space-x-2 ' }>
		{/*<SecondaryButton title={ 'Cancelar' } onClick={ onCloseModal }/>*/ }
		<CustomAsyncButton
		  title={ 'Guardar cambios' }
		  color={ 'primary' }
		  variant={ 'solid' }
		  isDisabled={ !form.isValid }
		  onClick={ form.submitForm }
		  isLoading={ form.isSubmitting }
		/>
	  </div>
	</form>
  );
}
