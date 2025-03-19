/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { Card, CardBody, CardHeader, Divider, Spacer } from "@heroui/react";
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { deleteCookie } from 'cookies-next';
import { LoadingComponent } from '@/src/components/pageStates/LoadingComponent';
import ErrorComponent from '@/src/components/pageStates/ErrorComponent';
import { APP_ROUTES } from '@/src/core/routes/routes';
import CustomTextInput from '@/src/components/inputs/basic/CustomTextInput';
import { CustomAsyncButton } from '@/src/components/buttons/CustomAsyncButton';
import { useInvitationStore } from '@/src/features/shared/invitations/ui/store/InvitationStore';
import Background from '@/src/features/authentication/ui/components/Background';
import LogoAndText from '@/src/features/authentication/ui/components/LogoAndText';
import { useUserStore } from '@/src/features/users/ui/store/useUserStore';
import {
  confirmPasswordValidation,
  emailUserValidation,
  passwordValidation,
  usernameValidation,
} from '@/src/core/common/validations/userValidations';

function RegisterPage() {
  const { data : inv, getInvitation, isLoading : loading } = useInvitationStore();
  const { registerUser } = useUserStore();
  
  const [passVisible, setPassVisible] = useState( false );
  const [confirmVisible, setConfirmVisible] = useState( false );
  const toggleVisibilityPass = () => setPassVisible( !passVisible );
  const toggleVisibilityConfirm = () => setConfirmVisible( !confirmVisible );
  
  const router = useRouter();
  
  useEffect( () => {
	deleteCookie( 'accessToken' );
	deleteCookie( 'refreshToken' );
	deleteCookie( 'user' );
	verifyInvitation();
  }, [] );
  
  const verifyInvitation = async () => {
	const id = new URLSearchParams( window.location.search ).get( 'id' );
	getInvitation( id! );
  };
  
  const formik = useFormik( {
	initialValues : {
	  name : inv?.person?.name ?? undefined,
	  lastName : inv?.person?.lastName ?? undefined,
	  identityCard : inv?.person?.identityCard ?? undefined,
	  email : inv?.person?.email ?? undefined,
	  bankAccount : inv?.person?.bankAccount ?? undefined,
	  phone : inv?.person?.phone ?? undefined,
	  scientificCategory : inv?.person?.scientificCategory ?? undefined,
	  scientificDegree : inv?.person?.scientificDegree ?? undefined,
	  educationalCategory : inv?.person?.educationalCategory ?? undefined,
	  academicDegree : inv?.person?.academicDegree ?? undefined,
	  technologyCategory : inv?.person.technologyCategory ?? undefined,
	  wage : inv?.person?.wage ?? undefined,
	  englishLevel : inv?.person?.englishLevel ?? undefined,
	  password : '',
	  passwordConfirm : '',
	  username : undefined,
	  submit : null,
	},
	validationSchema : Yup.object().shape( {
	  username : usernameValidation(),
	  email : emailUserValidation(),
	  password : passwordValidation,
	  passwordConfirm : confirmPasswordValidation,
	} ),
	onSubmit : async ( values, { setSubmitting } ) => {
	  setSubmitting( true );
	  const response = await registerUser( {
		person : inv!.person!.id!,
		email : values.email!,
		roles : [],
		username : values.username!,
		password : values.password!,
	  } );
	  setSubmitting( true );
	  if ( response ) {
		router.replace( APP_ROUTES.LOGIN );
	  }
	},
  } );
  
  return (
	<>
	  { loading ? (
		<LoadingComponent text=""/>
	  ) : !inv ? (
		<ErrorComponent
		  errorTitle={ 'La invitación ya no existe' }
		  errorSubtitle={ 'Contacte con su superior' }
		/>
	  ) : inv?.person && inv.hasExpired == true ? (
		<ErrorComponent
		  errorTitle={ 'La invitación ha expirado' }
		  errorSubtitle={ 'Contacte con su superior' }
		/>
	  ) : (
		<form onSubmit={ formik.handleSubmit }>
		  <div className="m-0 flex h-full w-full items-center justify-center p-0">
			<Background/>
			<Card className="absolute" style={ { width : 500, padding : 10 } }>
			  <CardHeader className="flex flex-col justify-center">
				<LogoAndText/>
			  </CardHeader>
			  <CardBody>
				<CustomTextInput
				  form={ formik }
				  formKey={ 'username' }
				  label={ 'Nombre de usuario' }
				  placeholder={ 'usuario' }
				  isRequired={ true }
				/>
				<Spacer/>
				<CustomTextInput
				  form={ formik }
				  formKey={ 'email' }
				  label={ 'Correo electrónico' }
				  placeholder={ 'ejemplo@ejemplo.com' }
				  isRequired={ true }
				/>
				<Spacer/>
				<CustomTextInput
				  dontCopy
				  form={ formik }
				  formKey={ 'password' }
				  label={ 'Contraseña' }
				  placeholder={ '******' }
				  type={ passVisible ? 'text' : 'password' }
				  isRequired={ true }
				  endContent={
					<button
					  className="focus:outline-none"
					  type="button"
					  onClick={ toggleVisibilityPass }
					>
					  { passVisible ? (
						<Icon className=" mr-10" icon={ eye } size={ 20 }/>
					  ) : (
						<Icon className=" mr-10" icon={ eyeOff } size={ 20 }/>
					  ) }
					</button>
				  }
				/>
				<Spacer/>
				{ formik.errors.password && (
				  <ValidatePass password={ formik.values.password }/>
				) }
				<Spacer/>
				<CustomTextInput
				  dontCopy
				  form={ formik }
				  formKey={ 'passwordConfirm' }
				  label={ 'Confirmar contraseña' }
				  placeholder={ '******' }
				  type={ confirmVisible ? 'text' : 'password' }
				  isRequired={ true }
				  endContent={
					<button
					  className="focus:outline-none"
					  type="button"
					  onClick={ toggleVisibilityConfirm }
					>
					  { confirmVisible ? (
						<Icon className=" mr-10" icon={ eye } size={ 20 }/>
					  ) : (
						<Icon className=" mr-10" icon={ eyeOff } size={ 20 }/>
					  ) }
					</button>
				  }
				/>
				<Spacer y={ 5 }/>
				<CustomAsyncButton
				  isFullWidth={ true }
				  variant="solid"
				  color="primary"
				  isDisabled={ !formik.isValid }
				  onClick={ formik.handleSubmit }
				  title={ 'Registrar' }
				  isLoading={ formik.isSubmitting }
				/>
			  </CardBody>
			</Card>
		  </div>
		</form>
	  ) }
	</>
  );
}

const ValidatePass = ( { password } : { password : any } ) => {
  const [isLengthValid, setLengthValid] = useState( false );
  const [hasNumber, setHasNumber] = useState( false );
  const [hasLowerCase, setHasLowerCase] = useState( false );
  const [hasUpperCase, setHasUpperCase] = useState( false );
  const [hasSymbol, setHasSymbol] = useState( false );
  
  useEffect( () => {
	setLengthValid( password.length >= 8 );
	setHasNumber( /\d/.test( password ) );
	setHasLowerCase( /[a-z]/.test( password ) );
	setHasUpperCase( /[A-Z]/.test( password ) );
	setHasSymbol( /[^\w]/.test( password ) );
  }, [password] );
  
  const conditions = [
	isLengthValid,
	hasNumber,
	hasLowerCase,
	hasUpperCase,
	hasSymbol,
  ];
  
  const barsCondition = [
	{
	  condition : isLengthValid,
	  text : 'Al menos 8 caracteres',
	},
	{
	  condition : hasNumber,
	  text : 'Al menos un número',
	},
	{
	  condition : hasLowerCase,
	  text : 'Al menos una letra minúscula',
	},
	{
	  condition : hasUpperCase,
	  text : 'Al menos una letra mayúscula',
	},
	{
	  condition : hasSymbol,
	  text : 'Al menos un símbolo',
	},
  ];
  
  const validCount = conditions.filter( ( condition ) => condition ).length;
  
  return (
	<div style={ { width : 'full', display : 'flex', flexDirection : 'column' } }>
	  { validCount == 5 ? (
		<></>
	  ) : (
		<div className="flex flex-row justify-center">
		  <Bars validCount={ validCount }/>
		</div>
	  ) }
	  <div style={ { margin : 10 } }>
		<SuggestionLines
		  barsCondition={ barsCondition }
		  conditions={ conditions }
		/>
	  </div>
	</div>
  );
};
export default RegisterPage;

function SuggestionLines( {
							barsCondition,
							conditions,
						  } : {
  barsCondition : any[];
  conditions : boolean[];
} ) {
  const suggestionLines = conditions.map( ( condition, index ) => (
	<div
	  key={ index }
	  className={ `text-small text-${ condition ? 'success' : 'danger' }` }
	>
	  <div className="flex flex-row items-center">
		{ condition ? <></> : <>{ barsCondition[ index ].text }</> }
	  </div>
	</div>
  ) );
  
  return suggestionLines;
}

function Bars( { validCount } : { validCount : number } ) {
  const bars = Array.from( { length : 5 }, ( _, index ) => (
	<Divider
	  key={ index }
	  style={ {
		margin : 4,
		height : 4,
		width : 80,
		borderRadius : 20,
	  } }
	  className={ `bg-${ index < validCount ? 'success' : 'default-200' }` }
	/>
  ) );
  
  return bars;
}
