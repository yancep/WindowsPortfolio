import {
  NomenclaturesRepository
} from '@/src/features/shared/nomenclatures/domain/repositories/NomenclaturesRepository';
import { NomenclaturesDataSources } from '../data_sources/NomenclaturesDataSources';
import { KnowledgeFieldItem, KnowledgeGroupItem, KnowledgeSubgroupItem, } from '../../domain/entities/KnowledgeFields';

export const NomenclaturesRepositoryImpl = (
  nomenclaturesDataSources : NomenclaturesDataSources,
) : NomenclaturesRepository => ( {
  getScientificCategory : async () => {
	try {
	  return await nomenclaturesDataSources.getScientificCategory();
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
  
  getEducationalCategories : async () => {
	try {
	  return await nomenclaturesDataSources.getEducationalCategories();
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
  
  getScientificDegrees : async () => {
	try {
	  return await nomenclaturesDataSources.getScientificDegrees();
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
  
  getAcademicDegrees : async () => {
	try {
	  return await nomenclaturesDataSources.getAcademicDegrees();
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
  
  getEnglishLevels : async () => {
	try {
	  return await nomenclaturesDataSources.getEnglishLevels();
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
  
  getTechnologyCategories : async () => {
	try {
	  return await nomenclaturesDataSources.getTechnologyCategories();
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
  
  getLinesOfResearch : async () => {
	try {
	  return await nomenclaturesDataSources.getLinesOfResearch();
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
  
  getProvinces : async ( request ) => {
	try {
	  const response = await nomenclaturesDataSources.getProvinces( request );
	  return response.data;
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
  
  getAdministrationBodies : async ( request ) => {
	try {
	  return await nomenclaturesDataSources.getAdministrationBodies( request );
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
  
  getKnowledgeGroups : async function () : Promise<KnowledgeGroupItem[]> {
	try {
	  return await nomenclaturesDataSources.getKnowledgeGroups();
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
  
  getKnowledgeSubGroups : async function (
	url,
  ) : Promise<KnowledgeSubgroupItem[]> {
	try {
	  return await nomenclaturesDataSources.getKnowledgeSubGroupsByUrl( url );
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
  
  getKnowledgeFields : async function ( url ) : Promise<KnowledgeFieldItem[]> {
	try {
	  return await nomenclaturesDataSources.getKnowledgeFieldsByUrl( url );
	} catch ( error ) {
	  throw Error( 'Ha ocurrido un error de conexión' );
	}
  },
} );
