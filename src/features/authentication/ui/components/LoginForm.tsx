'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomAsyncButton } from '@/src/components/buttons/CustomAsyncButton';
import { Input, Spacer } from "@heroui/react";
import { AuthenticationSelectionsStore } from '@/src/features/authentication/ui/stores/AuthenticationStore';
import CustomTextInput from '@/src/components/inputs/basic/CustomTextInput';
import { useRouter } from 'next/navigation';
import { APP_ADMIN_ROUTES, APP_ROUTES } from '@/src/core/routes/routes';
import Link from 'next/link';
import { defaultValidation } from '@/src/core/common/validations/defaultValidations';
import { useState } from 'react';
import { emailRegex } from '@/src/core/common/validations/regexs';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useUserStore } from '@/src/features/users/ui/store/useUserStore';
import translateSystem from '@/src/core/locales/i18next';

export const LoginForm = () => {
  const profileStore = useUserStore( ( state ) => state );
  
  const login = AuthenticationSelectionsStore.use.login();
  
  const router = useRouter();
  const [passVisible, setPassVisible] = useState( false );
  const toggleVisibilityPass = () => setPassVisible( !passVisible );
  const form = useFormik( {
	initialValues : {
	  email : '',
	  password : '',
	},
	validationSchema : Yup.object().shape( {
	  email : Yup.string()
		.required( 'Campo requerido' )
		.trim()
		.test(
		  'validateEmailOrUsername',
		  'Formato incorrecto',
		  function ( value ) {
			// Verificar si el valor contiene el carácter '@'
			if ( value.includes( '@' ) ) {
			  return Yup.string()
				.email( 'Formato incorrecto' )
				.matches( emailRegex, 'Formato incorrecto' )
				.isValidSync( value );
			} else {
			  // Si no contiene '@', validar como nombre de usuario
			  return Yup.string().isValidSync( value );
			}
		  },
		),
	  password : defaultValidation,
	} ),
	onSubmit : async ( values ) => {
	  const response = await login( {
		email : values.email,
		password : values.password,
	  } );
	  
	  console.log( 'response', response );
	  if ( response ) {
		profileStore.setUser( response );
		if ( response?.isAdmin ) router.replace( APP_ADMIN_ROUTES.PROGRAMS );
		else router.replace( APP_ROUTES.CLIENT );
	  }
	},
  } );
  
  return (
	<form onSubmit={ form.handleSubmit }>
	  <CustomTextInput
		form={ form }
		formKey={ 'email' }
		label={ 'Nombre de usuario o correo electrónico' }
		placeholder={ 'Correo electrónico' }
		isRequired={ true }
	  />
	  <Spacer y={ 2 }/>
	  <div className={ 'flex flex-col' }>
        <span className="text-small text-foreground opacity-70">
          Contraseña
        </span>
		<Input
		  id="password"
		  variant="bordered"
		  fullWidth
		  type={ passVisible ? 'text' : 'password' }
		  size="md"
		  onChange={ ( e ) => {
			form.handleChange( e );
			form.setFieldValue( 'password', e.target.value );
		  } }
		  color={
			form.touched.password && form.errors.password ? 'danger' : 'primary'
		  }
		  endContent={
			<button
			  className="focus:outline-none"
			  type="button"
			  onClick={ toggleVisibilityPass }
			>
			  { passVisible ? <FiEye/> : <FiEyeOff/> }
			</button>
		  }
		  value={ form.values.password }
		  placeholder="********"
		/>
	  </div>
	  <Spacer y={ 4 }/>
	  <div className="flex flex-row items-center justify-end text-medium text-primary">
		<Link
		  href={ APP_ROUTES.RESET_PASSWORD }
		  className="flex flex-row items-center"
		>
          <span className={ 'text-sm' }>
            { translateSystem.t( 'inputs.labels.password.passwordRecovery' ) }
          </span>
		</Link>
	  </div>
	  <Spacer y={ 6 }/>
	  <CustomAsyncButton
		isFullWidth={ true }
		variant="solid"
		color="primary"
		isDisabled={ !form.isValid || form.isSubmitting }
		onClick={ form.handleSubmit }
		title={ 'Iniciar Sesión' }
		isLoading={ form.isSubmitting }
	  />
	</form>
  );
};
