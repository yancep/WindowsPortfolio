'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useAuthenticationStore } from '@/src/features/authentication/ui/stores/AuthenticationStore';
import { APP_ROUTES } from '@/src/core/routes/routes';
import { Card, CardBody, CardHeader, Spacer } from "@heroui/react";
import GapidLogo from '@/src/components/Icons/app/GapidLogo';
import translateSystem from '@/src/core/locales/i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '@/src/components/inputs/basic/CustomTextInput';
import Icon from 'react-icons-kit';
import { ValidatePass } from '@/src/features/authentication/ui/components/PassUtils';
import { CustomAsyncButton } from '@/src/components/buttons/CustomAsyncButton';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import Background from '@/src/features/authentication/ui/components/Background';

export default function Page() {
  return (
    <Suspense>
      <PageBody />
    </Suspense>
  );
}

function PageBody() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  return <ConfirmPasswordView token={token!} />;
}

function ConfirmPasswordView({ token }: { token: string }) {
  const router = useRouter();
  const { validateToken } = useAuthenticationStore();
  useEffect(() => {
    if (token) {
      validateTokenAndUpdate(token);
    }
  }, [token, validateToken]);

  async function validateTokenAndUpdate(token: string) {
    const response = await validateToken({ token });
    if (!response) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      router.push(APP_ROUTES.LOGIN);
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Background />
      <Card className="absolute" style={{ width: 500, padding: 10 }}>
        <CardHeader className="flex flex-col">
          <GapidLogo />
          <span className="text-large font-semibold">
            {translateSystem.t('inputs.labels.password.confirmPassword')}
          </span>
        </CardHeader>
        <CardBody>
          <ConfirmPasswordForm token={token} />
        </CardBody>
      </Card>
    </div>
  );
}

function ConfirmPasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const { confirmResetPassword } = useAuthenticationStore();
  const [passVisible, setPassVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const toggleVisibilityPass = () => setPassVisible(!passVisible);
  const toggleVisibilityConfirm = () => setConfirmVisible(!confirmVisible);

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
      submit: null,
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
      passwordConfirm: Yup.string().oneOf(
        [Yup.ref('password')],
        'Las contraseñas no coinciden',
      ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const response = await confirmResetPassword({
        token: token!,
        password: values.password,
      });
      if (response) router.replace(APP_ROUTES.LOGIN);
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.submitForm}>
      <CustomTextInput
        form={formik}
        dontCopy
        formKey={'password'}
        label={'Contraseña'}
        placeholder={'******'}
        type={passVisible ? 'text' : 'password'}
        isRequired={true}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibilityPass}
          >
            {passVisible ? (
              <Icon className=" mr-10" icon={eye} size={20} />
            ) : (
              <Icon className=" mr-10" icon={eyeOff} size={20} />
            )}
          </button>
        }
      />
      <Spacer />
      {formik.errors.password && (
        <ValidatePass password={formik.values.password} />
      )}
      <Spacer />
      <CustomTextInput
        form={formik}
        dontCopy
        formKey={'passwordConfirm'}
        label={'Confirmar contraseña'}
        placeholder={'******'}
        type={confirmVisible ? 'text' : 'password'}
        isRequired={true}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibilityConfirm}
          >
            {confirmVisible ? (
              <Icon className=" mr-10" icon={eye} size={20} />
            ) : (
              <Icon className=" mr-10" icon={eyeOff} size={20} />
            )}
          </button>
        }
      />
      <Spacer y={5} />
      <CustomAsyncButton
        isLoading={formik.isSubmitting}
        isDisabled={!formik.isValid}
        color="primary"
        isFullWidth
        variant={'solid'}
        onClick={formik.submitForm}
        title="Restablecer"
      />
    </form>
  );
}
