import * as Yup from 'yup';
import { emailRegex } from '@/src/core/common/validations/regexs';
import { usersRepository } from '@/src/features/users/domain/repositories/UsersRepository';
import { ValidationErrorMessages } from '@/src/core/common/validations/errorMessages';

// Función para verificar duplicados
const checkDuplicate = async (
  field: string,
  value: string,
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const isDuplicateExists = await usersRepository.validateUserField(
        field,
        value,
      );
      resolve(isDuplicateExists); // Resuelve a un booleano
    }, 100);
  });
};

// Validaciones
export function usernameValidation() {
  return Yup.string()
    .required(ValidationErrorMessages.required)
    .trim()
    .test(
      'checkUsername',
      ValidationErrorMessages.usernameUnavailable,
      async function (value) {
        return await checkDuplicate('username', value);
      },
    );
}

export function emailUserValidation() {
  return Yup.string()
    .required(ValidationErrorMessages.required)
    .email(ValidationErrorMessages.formatIncorrect)
    .matches(emailRegex, ValidationErrorMessages.formatIncorrect)
    .test(
      'checkEmail',
      ValidationErrorMessages.emailUnavailable,
      async function (value) {
        const isDuplicate = await checkDuplicate('email', value || '');
        return isDuplicate; // Devuelve un booleano
      },
    );
}

export const passwordValidation = Yup.string()
  .required(ValidationErrorMessages.required)
  .min(8, ValidationErrorMessages.passwordMinLength)
  .matches(/[0-9]/, ValidationErrorMessages.passwordNumber)
  .matches(/[a-z]/, ValidationErrorMessages.passwordLowercase)
  .matches(/[A-Z]/, ValidationErrorMessages.passwordUppercase)
  .matches(/[^\w]/, ValidationErrorMessages.passwordSymbol);

export const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref('password')], ValidationErrorMessages.confirmPasswordMismatch)
  .required(ValidationErrorMessages.required);
