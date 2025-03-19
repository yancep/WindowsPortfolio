import { numberRegex } from './regexs';
import * as Yup from 'yup';
import moment from 'moment';
import { programRepository } from '@/src/features/programs/domain/repositories/ProgramsRepository';
import { projectRepository } from '@/src/features/projects/domain/repositories/ProjectRepository';

export const projectCodeValidation = ( programId : string ) =>
  Yup.string()
	.required( 'Campo requerido' )
	.test(
	  'checkDuplCode',
	  'Ya existe un proyecto con ese código',
	  function ( value ) {
		return new Promise( ( resolve ) => {
		  setTimeout( async () => {
			const response = await projectRepository.validateProjectCode( {
			  code : value,
			  program : programId,
			} );
			resolve( response );
		  }, 500 );
		} );
	  },
	)
	.matches( numberRegex, 'Formato incorrecto' );

export const validateExitingProjectByCode = ( url : string, program? : string, ) =>
  Yup.string()
	.required( 'Campo requerido' )
	.test(
	  'checkDuplCode',
	  'Ya existe un proyecto con ese código',
	  function ( value ) {
		return new Promise( ( resolve ) => {
		  setTimeout( async () => {
			const response =
			  await projectRepository.validateExistingProjectCode( url, {
				code : value, program : program
			  } );
			resolve( response );
		  }, 500 );
		} );
	  },
	)
	.matches( numberRegex, 'Formato incorrecto' );

export const projectStartDateValidation = (
  programStartDate : string,
  programEndDate : string,
) =>
  Yup.date()
	.required( 'Campo requerido' )
	.test( {
	  name : 'startDateCheck',
	  exclusive : false,
	  message : 'La fecha de inicio está fuera de rango',
	  test : function ( value ) {
		const startDate = moment( value );
		return (
		  startDate.isSameOrAfter( programStartDate ) &&
		  startDate.isBefore( programEndDate )
		);
	  },
	} );

export const projectEndDateValidation = (
  programStartDate : string,
  programEndDate : string,
) =>
  Yup.date()
	.required( 'Campo requerido' )
	.test( {
	  name : 'same',
	  exclusive : false,
	  params : {},
	  message : 'La fecha de fin debe ser mayor que la fecha de inicio',
	  test : function ( value ) {
		const startDate = moment( this.parent.startDate ).format( 'YYYY-MM-DD' );
		const endDate = moment( value ).format( 'YYYY-MM-DD' );
		return !moment( startDate ).isSame( moment( endDate ) );
	  },
	} )
	.test( {
	  name : 'endDateCheck',
	  exclusive : false,
	  message : 'La fecha de fin está fuera de rango',
	  test : function ( value ) {
		const endDate = moment( value );
		return (
		  endDate.isSameOrAfter( programStartDate ) &&
		  endDate.isSameOrBefore( programEndDate )
		);
	  },
	} );

export const programCodeValidation = ( programId? : string ) =>
  Yup.string()
	.required( 'Campo requerido' )
	.test(
	  'checkDuplCode',
	  'Ya existe un programa con ese código',
	  function ( value ) {
		return new Promise( ( resolve ) => {
		  if ( programId ) {
			setTimeout( async () => {
			  const isDuplicateExists =
				await programRepository.validateProgramCode( {
				  code : value,
				  program : programId,
				} );
			  resolve( isDuplicateExists );
			}, 500 );
		  } else {
			setTimeout( async () => {
			  const isDuplicateExists =
				await programRepository.validateProgramCode( {
				  code : value,
				} );
			  resolve( isDuplicateExists );
			}, 500 );
		  }
		} );
	  },
	);

export const programEndDateValidation = Yup.date()
  .required( 'Campo requerido' )
  .min(
	Yup.ref( 'startDate' ),
	'La fecha de fin debe ser mayor que la fecha de inicio',
  )
  .test( {
	name : 'same',
	exclusive : false,
	params : {},
	message : 'La fecha de fin debe ser mayor que la fecha de inicio',
	test : function ( value ) {
	  const startDate = moment( this.parent.startDate ).format( 'YYYY-MM-DD' );
	  const endDate = moment( value ).format( 'YYYY-MM-DD' );
	  return !moment( startDate ).isSame( moment( endDate ) );
	},
  } );
