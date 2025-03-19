import { Input } from "@heroui/react";
import { FormikValues } from 'formik';
import React from 'react';

interface CustomFileInputProps {
  form: FormikValues;
  formKey: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  accept: string;
  disabled?: boolean;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  form,
  formKey,
  label,
  isRequired,
  accept,
  disabled,
}) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      console.log('entro');
      const file = e.currentTarget.files[0];
      const arrayBuffer = await file.arrayBuffer();
      if (file.type == 'application/x-pkcs12')
        form.setFieldValue('p12File', Buffer.from(arrayBuffer));
      else form.setFieldValue('signature_img', Buffer.from(arrayBuffer));
    }
  };

  return (
    <div className="flex w-full flex-col">
      <span className="flex flex-row text-small text-foreground opacity-70">
        {label}
        {isRequired && <div className="text-danger">*</div>}
      </span>
      <Input
        id={formKey}
        variant="bordered"
        size="sm"
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomFileInput;
