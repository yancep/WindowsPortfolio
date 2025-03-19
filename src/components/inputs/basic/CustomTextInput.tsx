import { Input, Spacer, Tooltip } from '@heroui/react';
import React from 'react';
import {
  formatBankAccount,
  formatNumber,
  formatPhone,
} from '@/src/core/common/utils/utils';
import {
  BANK_ACCOUNT_PLACEHOLDER,
  PHONE_PLACEHOLDER,
} from '@/src/components/inputs/const/placeholder';
import { FormikValues } from 'formik';
import InfoIcon from '@/public/icons/InfoIcon';

interface CustomTextInputProps {
  form: FormikValues;
  formKey: string;
  label?: string;
  placeholder?: string;
  isRequired: boolean;
  type?: InputType;
  startContent?: React.ReactNode | null;
  endContent?: React.ReactNode | null;
  autoFocus?: boolean;
  maxLength?: number;
  inputType?: 'text' | 'phone' | 'bankAccount' | 'number';
  description?: string;
  defaultValue?: string;
  isDisable?: boolean;
  dontCopy?: boolean;
  textInfo?: string;
  error?: React.ReactNode;
  className?: string;
}

type InputType =
  | 'text'
  | 'number'
  | 'search'
  | 'url'
  | 'tel'
  | 'email'
  | 'password'
  | 'date';

const CustomTextInput = ({
  form,
  formKey,
  label,
  placeholder,
  isRequired,
  type = 'text',
  startContent,
  endContent,
  maxLength,
  autoFocus,
  inputType = 'text',
  description,
  defaultValue,
  isDisable = false,
  dontCopy = false,
  textInfo,
  error,
  className,
}: CustomTextInputProps) => {
  function getValueForType(value: string) {
    switch (inputType) {
      case 'text':
        return value;
      case 'phone':
        return formatPhone(value);
      case 'number':
        return formatNumber(value);
      case 'bankAccount':
        return formatBankAccount(value);
      default:
        return value;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Remove formatting before setting the value
    if (inputType === 'phone' || inputType === 'bankAccount') {
      newValue = newValue.replace(/\D/g, '');
    }
    form.handleChange(e);
    form.setFieldValue(formKey, newValue);
  };

  return (
    <div className={className ?? `flex w-full flex-col`}>
      <div className="flex flex-row items-center text-small text-foreground opacity-70">
        {label}
        {isRequired && <span className="text-danger">*</span>}
        <Spacer />
        {textInfo && (
          <Tooltip
            classNames={{
              content: 'w-[300px] p-2 text-justify',
            }}
            content={textInfo}
            placement={'right'}
          >
            <div>
              <InfoIcon />
            </div>
          </Tooltip>
        )}
      </div>
      <Input
        onCopy={(e) => dontCopy && e.preventDefault()}
        onFocus={() => form.setFieldTouched(formKey)}
        id={formKey}
        autoFocus={autoFocus}
        description={description}
        isDisabled={isDisable}
        variant="bordered"
        required={isRequired}
        size="md"
        defaultValue={defaultValue}
        radius={'sm'}
        maxLength={
          inputType === 'phone'
            ? 10 // Updated to match the format +53 5 XXX XXXX
            : inputType === 'bankAccount'
              ? 16
              : (maxLength ?? maxLength)
        }
        startContent={
          inputType === 'phone' ? (
            <span className="items-center text-small">+53</span>
          ) : (
            (startContent ?? startContent)
          )
        }
        endContent={endContent ?? undefined}
        onBlur={form.handleBlur}
        color={
          form.touched[formKey] && form.errors[formKey] ? 'danger' : 'primary'
        }
        errorMessage={
          error
            ? error
            : form.touched[formKey] && form.errors[formKey]
              ? form.errors[formKey]
              : undefined
        }
        isInvalid={form.touched[formKey] && form.errors[formKey]}
        type={type}
        onChange={handleChange}
        value={getValueForType(form.values[formKey])}
        placeholder={
          inputType === 'phone'
            ? PHONE_PLACEHOLDER
            : inputType === 'bankAccount'
              ? BANK_ACCOUNT_PLACEHOLDER
              : (placeholder ?? placeholder)
        }
      />
    </div>
  );
};

export default CustomTextInput;
