'use client';

import { Card, CardBody, CardFooter, CardHeader, Spacer, } from '@heroui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GapidLogo from '@/src/components/Icons/app/GapidLogo';
import CustomTextInput from '@/src/components/inputs/basic/CustomTextInput';
import { CustomAsyncButton } from '@/src/components/buttons/CustomAsyncButton';
import { useRouter } from 'next/navigation';
import translateSystem from '@/src/core/locales/i18next';
import { useAuthenticationStore } from '@/src/features/authentication/ui/stores/AuthenticationStore';
import ChevronLeftIcon from '@/public/icons/ChevronLeftIcon';
import { APP_ROUTES } from '@/src/core/routes/routes';
import Link from 'next/link';
import { emailRegex } from '@/src/core/common/validations/regexs';
import Background from '@/src/features/authentication/ui/components/Background';

export default function Page() {
  return <ResetPasswordView/>;
}

function ResetPasswordView() {
  const router = useRouter();
  
  return (
	<div className="flex h-full w-full items-center justify-center">
	  <Background/>
	  <Card className="absolute" style={ { width : 500, padding : 10 } }>
		<CardHeader className="flex flex-col text-center">
		  <GapidLogo/>
		  <Spacer/>
		  <span className="text-large font-semibold">
            { translateSystem.t( 'inputs.labels.password.passwordRecovery' ) }
          </span>
		  <Spacer/>
		</CardHeader>
		<CardBody>
		  <ResetPasswordForm/>
		</CardBody>
		<CardFooter className="justify-center">
		  <Link
			href={ APP_ROUTES.LOGIN }
			className="flex flex-row items-center justify-center text-medium text-primary">
			<ChevronLeftIcon height={ 13 } width={ 13 }/>
			<span>Volver a inicio de sesión</span>
		  </Link>
		</CardFooter>
	  </Card>
	</div>
  )
	;
}

function ResetPasswordForm() {
  const { resetPassword } = useAuthenticationStore();
  
  const formik = useFormik( {
	initialValues : {
	  email : undefined,
	  submit : null,
	},
	validationSchema : Yup.object().shape( {
	  email : Yup.string()
		.required( 'Campo requerido' )
		.trim()
		.email( 'Formato incorrecto' )
		.matches( emailRegex, 'Formato incorrecto' ),
	} ),
	onSubmit : async ( values ) => {
	  await resetPassword( {
		email : values.email!,
	  } );
	},
  } );
  
  return (
	<form onSubmit={ formik.submitForm }>
	  <CustomTextInput
		form={ formik }
		formKey={ 'email' }
		label={ translateSystem.t( 'inputs.labels.email' ) }
		placeholder={ translateSystem.t( 'inputs.placeholders.basic.email' ) }
		isRequired={ true }
	  />
	  <Spacer y={ 5 }/>
	  <CustomAsyncButton
		isLoading={ formik.isSubmitting }
		isDisabled={ !formik.isValid }
		color="primary"
		isFullWidth
		variant={ 'solid' }
		onClick={ formik.submitForm }
		title="Enviar"
	  />
	</form>
  );
}
