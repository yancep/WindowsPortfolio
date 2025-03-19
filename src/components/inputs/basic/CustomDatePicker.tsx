import { Input, Spacer, Tooltip } from "@heroui/react";
import React from 'react';
import InfoIcon from '@/public/icons/InfoIcon';
import { FormikValues } from 'formik';

const CustomDatePicker = ( {
							 form,
							 formKey,
							 label,
							 isRequired,
							 defaultValue,
							 isDisable = false,
							 textInfo,
						   } : {
  form : FormikValues;
  formKey : string;
  label? : string;
  placeholder? : string;
  isRequired : boolean;
  defaultValue? : string;
  isDisable? : boolean;
  textInfo? : string;
} ) => {
  return (
	<div className="flex w-full flex-col">
	  <div className="flex flex-row items-center text-small text-foreground opacity-70">
		<span>{ label }</span>
		{ isRequired && <span className="text-danger">*</span> }
		<Spacer/>
		{ textInfo && (
		  <Tooltip
			classNames={ {
			  content : 'w-[300px] p-2 text-justify',
			} }
			content={ textInfo }
			placement={ 'right' }
		  >
			<div>
			  <InfoIcon/>
			</div>
		  </Tooltip>
		) }
	  </div>
	  <Input
		onFocus={ () => form.setFieldTouched( formKey ) }
		id={ formKey }
		isDisabled={ isDisable }
		variant="bordered"
		required={ isRequired }
		size="md"
		defaultValue={ defaultValue }
		radius={ 'sm' }
		onBlur={ form.handleBlur }
		color={
		  form.touched[ formKey ] && form.errors[ formKey ] ? 'danger' : 'primary'
		}
		errorMessage={
		  form.errors[ formKey ]
			? form.errors[ formKey ]
			: undefined
		}
		isInvalid={form.touched[formKey] && form.errors[formKey]}
		type={ 'date' }
		onChange={ ( e ) => {
		  form.handleChange( e.target.value );
		  form.setFieldValue( formKey, e.target.value );
		} }
		value={ form.values[ formKey ] }
	  />
	</div>
  );
};

export default CustomDatePicker;
