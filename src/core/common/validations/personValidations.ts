import * as Yup from 'yup';
import { emailRegex, userRegex } from '@/src/core/common/validations/regexs';
import { personsRepository } from '@/src/features/persons/domain/repositories/PersonRepository';
import { ValidationErrorMessages } from '@/src/core/common/validations/errorMessages';

// Función para verificar duplicados
export const nameAndLastNameValidation = Yup.string()
  .required(ValidationErrorMessages.required)
  .matches(
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+([ '-][a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
    ValidationErrorMessages.formatIncorrect,
  );

const checkDuplicate = async (
  field: string,
  value: any,
  personId?: string,
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const isDuplicateExists = await personsRepository.validatePersonField(
        field,
        value,
        personId,
      );
      resolve(isDuplicateExists); // Resuelve a un booleano
    }, 100);
  });
};

// Validación de la tarjeta de identidad
export function identityCardValidation(personId?: string) {
  return Yup.string()
    .required(ValidationErrorMessages.required)
    .trim()
    .test(
      'checkIdentityCard',
      ValidationErrorMessages.identityCardUnavailable,
      async function (value) {
        return await checkDuplicate('identityCard', Number(value), personId);
      },
    )
    .matches(userRegex, ValidationErrorMessages.formatIncorrect);
}

// Validación del correo electrónico
export function emailValidation(person_email?: string) {
  return Yup.string()
    .required(ValidationErrorMessages.required)
    .trim()
    .email(ValidationErrorMessages.formatIncorrect)
    .matches(emailRegex, ValidationErrorMessages.formatIncorrect)
    .test(
      'checkEmail',
      ValidationErrorMessages.emailUnavailable,
      async function (value) {
        return await checkDuplicate('email', value || '', person_email);
      },
    );
}

// Validación del teléfono
export function phoneValidation(personId?: string) {
  return Yup.string()
    .required(ValidationErrorMessages.required)
    .max(10, ValidationErrorMessages.formatIncorrect)
    .test(
      'checkPhone',
      ValidationErrorMessages.phoneUnavailable,
      async function (value) {
        return await checkDuplicate('phone', value || '', personId);
      },
    );
}

// Validación de la cuenta bancaria
export function bankAccountValidation(personId?: string) {
  return Yup.string()
    .required(ValidationErrorMessages.required)
    .max(19, ValidationErrorMessages.formatIncorrect)
    .test(
      'checkBankAccount',
      ValidationErrorMessages.bankAccountUnavailable,
      async function (value) {
        return await checkDuplicate('bankAccount', value || '', personId);
      },
    );
}
