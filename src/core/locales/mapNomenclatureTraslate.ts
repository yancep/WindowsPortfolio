import {
  AcademicDegreeNomenclature,
  EducationalCategoryNomenclature,
  EnglishLevelNomenclature,
  ProjectClassificationNomenclature,
  ProjectStatusNomenclature,
  ScientificCategoryNomenclature,
  ScientificDegreeNomenclature,
  TechnologistCategoryNomenclature,
} from '@/src/features/shared/nomenclatures/domain/entities/PersonNomenclatures';
import { SystemRoleNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/SystemRoleNomenclatures';
import { ProgramLevel } from '@/src/features/programs/domain/entities/types';

export const roleToPosition = ( role : SystemRoleNomenclature ) => {
  switch (role) {
	case 'ADMIN':
	  return 'Administrador';
	case 'SPP_HEAD_OF_PROGRAM':
	  return 'Jefe de programa';
	case 'SPP_EXECUTIVE_SECRETARY':
	  return 'Secretario de programa';
	case 'SPP_PROGRAM_MANAGER':
	  return 'Gestor de programa';
	case 'SPP_PROGRAM_EXPERT':
	  return 'Experto de programa';
	case 'SPP_PROJECT_CHIEF':
	  return 'Jefe de projecto';
	case 'PCT_ADMINISTRATIVE_MANAGER':
	  return '';
	case 'PCT_PROGRAM_PRESIDENT':
	  return '';
	case 'PCT_PROGRAM_VICE_PRESIDENT':
	  return '';
	case 'PCT_CTA_PRESIDENT':
	  return '';
	case 'PCT_CTA_SECRETARY':
	  return '';
	case 'PCT_CTA_EXPERT':
	  return '';
	case 'PROJECT_MANAGER':
	  return 'Gestor de projecto';
	case 'ENTITY_CTI_MANAGER':
	  return 'Director de CTI de entidad';
	case 'ENTITY_GENERAL_MANAGER':
	  return 'Director General de entidad';
	case 'ENTITY_MANAGER':
	  return 'Gestor de entidad';
  }
};

export const getScientificCategoryToPosition = (
  role : ScientificCategoryNomenclature,
) => {
  switch (role) {
	case 'ASPIRANT_RESEARCH':
	  return 'Aspirante a Investigador';
	case 'AGGREGATE_RESEARCH':
	  return 'Investigador Agregado';
	case 'ASSISTANT_RESEARCH':
	  return 'Investigador Auxiliar';
	case 'PRINCIPAL_RESEARCH':
	  return 'Investigador Titular';
	case 'NONE':
	  return 'Ninguno';
	default:
	  return 'No especificado';
  }
};

export const getEducationalCategoryToPosition = (
  role : EducationalCategoryNomenclature,
) => {
  switch (role) {
	case 'INSTRUCTOR_PROFESSOR':
	  return 'Profesor Instructor';
	case 'ASSISTANT_PROFESSOR':
	  return 'Profesor Asistente';
	case 'ASPIRANT_PROFESSOR':
	  return 'Profesor Auxiliar';
	case 'PRINCIPAL_PROFESSOR':
	  return 'Profesor Titular';
	case 'NONE':
	  return 'Ninguno';
	default:
	  return 'No especificado';
  }
};

export const getAcademicDegreeToPosition = (
  degree : AcademicDegreeNomenclature,
) => {
  switch (degree) {
	case 'MASTER_OF_SCIENCES':
	  return 'Master en Ciencias';
	case 'SPECIALIST':
	  return 'Especialista en Posgrado';
	case 'NONE':
	  return 'Ninguno';
	default:
	  return 'No especificado';
  }
};

export const getScientificDegreeToPosition = (
  role : ScientificDegreeNomenclature,
) => {
  switch (role) {
	case 'DOCTOR_OF_SCIENCE':
	  return 'Doctor en Ciencia';
	case 'DOCTOR_OF_SCIENCES':
	  return 'Doctor en Ciencias';
	case 'NONE':
	  return 'Ninguno';
	default:
	  return 'No especificado';
  }
};

export const getProjectStatusToPosition = ( role : ProjectStatusNomenclature ) => {
  switch (role) {
	case 'CREATED':
	  return 'Creado';
	case 'IN_EXECUTION':
	  return 'En ejecución';
	case 'STOPPED':
	  return 'Detenido';
	case 'CANCELED':
	  return 'Cancelado';
	case 'CLOSED':
	  return 'Cerrado';
	default:
	  return 'No especificado';
  }
};

export const getProjectClassification = (
  role : ProjectClassificationNomenclature,
) => {
  switch (role) {
	case 'BASIC_RESEARCH':
	  return 'Investigación básica';
	case 'APPLIED_RESEARCH':
	  return 'Investigación aplicada';
	case 'EXPERIMENTAL_DEVELOPMENT':
	  return 'Desarrollo experimental';
	case 'INNOVATION':
	  return 'Innovación';
	default:
	  return 'No especificado';
  }
};

export const getTechnologistClassification = (
  technologist : TechnologistCategoryNomenclature,
) => {
  switch (technologist) {
	case 'INNOVATIVE_TECHNOLOGIST':
	  return 'Tecnólogo Innovador';
	case 'HIGH_TECHNOLOGY_PROCESS_SPECIALIST_III':
	  return 'Especialista Proceso de Alta Tecnología III';
	case 'HIGH_TECH_PROCESS_SPECIALIST_II':
	  return 'Especialista Proceso de Alta Tecnología II';
	case 'HIGH_TECH_PROCESS_SPECIALIST_I':
	  return 'Especialista Proceso de Alta Tecnología I';
	case 'THIRD_LEVEL_ADVANCED_TECHNOLOGIST':
	  return 'Tecnólogo de Avanzada de Tercer Nivel';
	case 'SECOND_LEVEL_ADVANCED_TECHNOLOGIST':
	  return 'Tecnólogo de Avanzada de Segundo Nivel';
	case 'ADVANCED_TECHNOLOGIST_FIRST_LEVEL':
	  return 'Tecnólogo de Avanzada de Primer Nivel';
	case 'SENIOR_BIOTECHNOLOGIST_III_LEVEL':
	  return 'Biotecnólogo Superior III Nivel';
	case 'SENIOR_BIOTECHNOLOGIST_II_LEVEL':
	  return 'Biotecnólogo Superior II Nivel';
	case 'SENIOR_BIOTECHNOLOGIST_I_LEVEL':
	  return 'Biotecnólogo Superior I Nivel';
	case 'NONE':
	  return 'Ninguno';
	default:
	  return 'No especificado';
  }
};

export const getLanguageLevelClassification = (
  level : EnglishLevelNomenclature,
) => {
  switch (level) {
	case 'A1':
	  return 'A1';
	case 'A2':
	  return 'A2';
	case 'B1':
	  return 'B1';
	case 'B2':
	  return 'B2';
	case 'C1':
	  return 'C1';
	case 'C2':
	  return 'C2';
	case 'NONE':
	  return 'Ninguno';
	default:
	  return 'No especificado';
  }
};

export const getProgramLevel = ( level : ProgramLevel ) => {
  switch (level) {
	case 'NATIONAL':
	  return '(PNCTI)';
	case 'SECTORIAL':
	  return '(PSCTI)';
	case 'TERRITORIAL':
	  return '(PTCTI)';
	case 'BUSINESS_DEMAND':
	  return '(PDECTI)';
	case 'INSTITUTIONAL':
	  return '(PICTI)';
  }
};
