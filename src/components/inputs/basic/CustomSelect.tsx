'use client';
import React, { useState } from 'react';
import { Select, SelectItem, Spacer, Tooltip } from "@heroui/react";
import { BaseItemNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/BaseItemNomenclature';
import { FormikValues } from 'formik';
import InfoIcon from '@/public/icons/InfoIcon';

/**
 * Componente CustomSelect para renderizar un select estilizado con integración Formik.
 * @param {CustomSelectProps} props - Props para el componente CustomSelect.
 * @returns {JSX.Element} Componente de select con estilo personalizado e integración Formik.
 */
const CustomSelect = ({
  items,
  defaultSelectedValue,
  form,
  formKey,
  label,
  isRequired,
  width,
  isDisable = false,
  multiple,
  textInfo,
  mapItem,
  mapKey,
  onChange,
  placeholder,
}: {
  placeholder?: string;
  items: BaseItemNomenclature[]; // Lista de elementos para el select
  form: FormikValues; // Valores del formulario Formik
  defaultSelectedValue?: string | number; // Valor predeterminado seleccionado
  formKey: string; // Clave del campo en los valores del formulario
  label?: string; // Etiqueta para el select
  width?: string | number; // Ancho del select
  isRequired: boolean; // Indica si el select es obligatorio
  isDisable?: boolean; // Indica si el select está deshabilitado
  multiple?: boolean; // Indica si se permite selección múltiple en el select
  textInfo?: string; // Texto a mostrar si es necesario mostrar una informacion al usuario
  mapItem?: (value: BaseItemNomenclature) => string | number | undefined;
  mapKey?: (key: BaseItemNomenclature) => string | number | undefined;
  onChange?: (key: string) => void;
}) => {
  const [value, setValue] = useState(defaultSelectedValue);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    form.setFieldValue(formKey, value);
    setValue(value);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center text-small text-foreground opacity-70">
        <span>{label}</span>
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
      <Select
        isDisabled={isDisable}
        style={{ width: width }}
        id={formKey}
        size="md"
        radius={'sm'}
        multiple={multiple}
        items={items}
        variant="bordered"
        placeholder={placeholder ?? 'Seleccionar'}
        onBlur={form.handleBlur}
        fullWidth
        color={
          form.touched[formKey] && form.errors[formKey] ? 'danger' : 'primary'
        }
        errorMessage={
          form.touched[formKey] && form.errors[formKey]
            ? form.errors[formKey]?.toString() !== 'Otro' &&
              form.errors[formKey]?.toString()
            : undefined
        }
        isInvalid={form.touched[formKey] && form.errors[formKey]}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          } else {
            form.handleChange(e);
            setValue(e.target.value);
            form.setFieldValue(formKey, e.target.value);
          }
        }}
        defaultSelectedKeys={value ? [value.toString()] : []}
      >
        {(item) => (
          <SelectItem key={mapKey ? mapKey(item)! : item.key!}>
            {mapItem ? mapItem(item) : item.label}
          </SelectItem>
        )}
      </Select>
    </div>
  );
};

export default CustomSelect;
