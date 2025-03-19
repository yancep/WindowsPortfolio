/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormikValues, useFormik } from 'formik';
import { StepsComponent } from '@/src/components/modals/parts/StepComponent';
import CustomSelect from '@/src/components/inputs/basic/CustomSelect';
import { CustomButton } from '@/src/components/buttons/CustomButton';
import { Divider, Spacer } from "@heroui/react";
import * as Yup from 'yup';
import { CustomAsyncButton } from '@/src/components/buttons/CustomAsyncButton';
import {
  defaultDateValidation,
  defaultValidation,
  numberTruncationValidation,
  numberValidation,
} from '@/src/core/common/validations/defaultValidations';
import CustomModalHeader from '@/src/components/modals/parts/CustomModalHeader';
import CustomModalBody from '@/src/components/modals/parts/CustomModalBody';
import CustomModalFooter from '@/src/components/modals/parts/CustomModalFooter';
import { CustomWageInput } from '@/src/components/inputs/customs/CustomWageInput';
import { useEffect, useState } from 'react';
import CustomTextInput from '@/src/components/inputs/basic/CustomTextInput';
import {
  programCodeValidation,
  programEndDateValidation,
} from '@/src/core/common/validations/programsAndProjectsValidations';
import { emailValidation } from '@/src/core/common/validations/personValidations';
import CustomDatePicker from '@/src/components/inputs/basic/CustomDatePicker';
import { CustomNumberInput } from '@/src/components/inputs/basic/CustomNumberInput';
import { ProgramsStore } from '@/src/features/admin/ui/stores/ProgramsStore';
import SearchEntities from '@/src/features/entities/ui/components/inputs/SearchEntities';
import { BaseItemNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/BaseItemNomenclature';
import SearchPersonByIdentityCardInput from '@/src/features/persons/ui/components/SearchPersonByIdentityCardInput';
import { EMAIL_PLACEHOLDER } from '@/src/components/inputs/const/placeholder';
import { EMAIL_LABEL } from '@/src/components/inputs/const/labels';
import { Program } from '@/src/features/programs/domain/entities/Program';
import { useProgramMetaData } from '@/src/features/programs/ui/layouts/stores/useProgramMetaData';
import { removeCommas } from '@/src/core/common/utils/utils';

export const RegisterProgramForm = ( {
									   program,
									   currentStep,
									   setCurrentStep,
									   onCloseModal,
									 } : {
  program? : Program | null;
  currentStep : number;
  setCurrentStep : ( step : any ) => void;
  onCloseModal : () => void;
} ) => {
  const [personData, setPersonData] = useState<string | undefined>( undefined );
  
  const { registerProgram } = ProgramsStore();
  const { getProgramLevels, programLevels : programLevels } =
	useProgramMetaData();
  
  useEffect( () => {
	getProgramLevels();
  }, [] );
  
  const formik = useFormik( {
	enableReinitialize : true,
	validationSchema : Yup.object().shape( {
	  name : defaultValidation,
	  code : programCodeValidation(),
	  budget : numberTruncationValidation,
	  entity : defaultValidation,
	  identityCard : numberValidation,
	  lastName : defaultValidation,
	  firstName : defaultValidation,
	  wage : numberTruncationValidation,
	  email : emailValidation( personData ),
	  level : defaultValidation,
	  projectsAmount : numberValidation,
	  startDate : defaultDateValidation,
	  endDate : programEndDateValidation,
	} ),
	validateOnChange : true,
	initialValues : {
	  name : undefined,
	  code : undefined,
	  lastName : undefined,
	  identityCard : undefined,
	  wage : undefined,
	  startDate : undefined,
	  endDate : undefined,
	  projectsAmount : undefined,
	  personId : undefined,
	  firstName : undefined,
	  budget : undefined,
	  abbreviatedName : undefined,
	  level : undefined,
	  email : undefined,
	  submit : null,
	  entity : undefined,
	  entityName : undefined,
	},
	onSubmit : async ( values, { resetForm, setSubmitting } ) => {
	  try {
		registerProgram( {
		  program : {
			name : values.name!,
			code : values.code!,
			budget : removeCommas( values.budget! ),
			abbreviatedName : values.abbreviatedName,
			projectsAmount : values.projectsAmount!,
			startDate : values.startDate!,
			endDate : values.endDate!,
			level : values.level!,
		  },
		  chief : {
			entity : values.entity!,
			wage : removeCommas( values.wage! ),
			name : values.firstName!,
			lastName : values.lastName!,
			position : 'PROGRAM_CHIEF',
			email : values.email!,
			identityCard : values.identityCard!,
		  },
		} );
		resetForm();
		onCloseModal();
	  } catch ( error ) {
		console.log( error );
	  }
	},
  } );
  
  return (
	<>
	  <form onSubmit={ formik.handleSubmit }>
		<CustomModalHeader>
		  { program ? 'Modificar programa' : 'Registrar programa' }
		</CustomModalHeader>
		<Divider/>
		<CustomModalBody>
		  <div style={ { margin : 4 } }>
			<StepsComponent
			  steps={ [
				{ id : 0, label : 'Información general', divider : true },
				{ id : 1, label : 'Jefe de programa' },
			  ] }
			  currentStep={ currentStep }
			/>
		  </div>
		  { currentStep === 0 && (
			<BasicProgramInfo formik={ formik } programLevels={ programLevels }/>
		  ) }
		  { currentStep === 1 && (
			<>
			  <SearchPersonByIdentityCardInput
				form={ formik }
				setPersonData={ ( id ) => setPersonData( id ) }
			  />
			  <div className="flex flex-row">
				<CustomTextInput
				  form={ formik }
				  formKey="firstName"
				  placeholder="Nombre"
				  label="Nombre"
				  isRequired={ true }
				/>
				<Spacer/>
				<CustomTextInput
				  form={ formik }
				  formKey="lastName"
				  placeholder="Apellidos"
				  label="Apellidos"
				  isRequired={ true }
				/>
			  </div>
			  <CustomTextInput
				form={ formik }
				formKey="email"
				placeholder={ EMAIL_PLACEHOLDER }
				label={ EMAIL_LABEL }
				isRequired={ true }
				type={ 'email' }
			  />{ ' ' }
			  <SearchEntities
				form={ formik }
				isRequired={ true }
				label="Entidad a la que pertenece"
				isFilter={ false }
				formKey={ 'entity' }
			  />
			  <CustomWageInput
				form={ formik }
				formKey="wage"
				label="Salario básico"
				isRequired={ true }
			  />
			</>
		  ) }
		</CustomModalBody>
		<Divider/>
		<CustomModalFooter>
		  { currentStep > 0 ? (
			<CustomButton
			  onClick={ () => setCurrentStep( ( step : number ) => step - 1 ) }
			  variant="flat"
			  color="secondary"
			  title="Atrás"
			/>
		  ) : (
			<div></div>
		  ) }
		  { currentStep === 0 ? (
			<CustomButton
			  variant="solid"
			  color="primary"
			  isDisabled={
				currentStep === 0 &&
				!!(
				  formik.errors.name ||
				  formik.errors.code ||
				  formik.errors.budget ||
				  formik.errors.projectsAmount ||
				  formik.errors.startDate ||
				  formik.errors.endDate ||
				  formik.errors.level
				)
			  }
			  title={ 'Siguiente' }
			  onClick={ () => setCurrentStep( ( step : number ) => step + 1 ) }
			/>
		  ) : (
			<CustomAsyncButton
			  isDisabled={ !formik.isValid }
			  variant="solid"
			  isLoading={ formik.isSubmitting }
			  color="primary"
			  title={ 'Registrar' }
			  onClick={ formik.submitForm }
			/>
		  ) }
		</CustomModalFooter>
	  </form>
	</>
  );
};

function BasicProgramInfo( {
							 formik,
							 programLevels,
						   } : {
  formik : FormikValues;
  programLevels : BaseItemNomenclature[];
} ) {
  return (
	<div>
	  <CustomTextInput
		form={ formik }
		formKey="name"
		placeholder="Título"
		label="Título"
		isRequired={ true }
	  />{ ' ' }
	  <Spacer/>
	  <div className="flex flex-row">
		<CustomSelect
		  mapKey={ ( item ) => item.key }
		  mapItem={ ( item ) => item.label }
		  items={ programLevels }
		  form={ formik }
		  defaultSelectedValue={ formik.values.level }
		  formKey="level"
		  label="Nivel del programa"
		  isRequired={ true }
		/>
		<Spacer/>
		<CustomTextInput
		  form={ formik }
		  formKey="abbreviatedName"
		  placeholder="Nombre abreviado"
		  label="Nombre abreviado"
		  isRequired={ false }
		/>
	  </div>
	  <Spacer/>
	  <CustomTextInput
		form={ formik }
		formKey="code"
		placeholder="Código"
		label="Código"
		isRequired={ true }
	  />{ ' ' }
	  <Spacer/>
	  <CustomWageInput
		form={ formik }
		formKey="budget"
		label="Presupuesto general del programa"
		isRequired={ true }
	  />{ ' ' }
	  <Spacer/>
	  <CustomNumberInput
		form={ formik }
		formKey="projectsAmount"
		placeholder="0"
		label="Cantidad estimada de proyectos"
		isRequired={ true }
	  />{ ' ' }
	  <Spacer/>
	  <div className="flex flex-row">
		<CustomDatePicker
		  form={ formik }
		  formKey="startDate"
		  placeholder="Fecha de inicio"
		  label="Fecha de inicio"
		  isRequired={ true }
		/>
		<Spacer/>
		<CustomDatePicker
		  form={ formik }
		  formKey="endDate"
		  placeholder="Fecha de fin"
		  label="Fecha de Fin"
		  isRequired={ true }
		/>
	  </div>
	</div>
  );
}
