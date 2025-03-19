/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateUrlAndQuery, Query, } from '@/src/core/api/services/url.service';
import { AxiosInstance } from 'axios';
import { CustomPagination } from '@/src/core/api/BaseState';
import { ProvinceNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/ProvinceNomenclature';

export interface NomenclaturesDataSources {
  getScientificCategory : () => Promise<any>;
  
  getEducationalCategories : () => Promise<any>;
  
  getScientificDegrees : () => Promise<any>;
  
  getAcademicDegrees : () => Promise<any>;
  
  getEnglishLevels : () => Promise<any>;
  
  getTechnologyCategories : () => Promise<any>;
  
  getLinesOfResearch : () => Promise<any>;
  
  getProvinces : (
	request : Query,
  ) => Promise<CustomPagination<ProvinceNomenclature>>;
  getAdministrationBodies : ( request : Query ) => Promise<any>;
  
  getKnowledgeGroups : () => Promise<any>;
  getKnowledgeSubGroupsByUrl : ( url : string ) => Promise<any>;
  getKnowledgeFieldsByUrl : ( url : string ) => Promise<any>;
}

const VERSION = 1;
const PEOPLE_BASE_PATH = 'persons';
const KNOWLEDGE_BASE_PATH = 'knowledge-field';

export const NomenclaturesDataSourcesImpl = (
  restClient : AxiosInstance,
) : NomenclaturesDataSources => ( {
  getScientificCategory : async function () : Promise<any> {
	const { path } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : `${ PEOPLE_BASE_PATH }/scientific-categories/`,
	} );
	return ( await restClient.get( path ) ).data;
  },
  
  getEducationalCategories : async function () : Promise<any> {
	const { path } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : `${ PEOPLE_BASE_PATH }/educational-categories/`,
	} );
	return ( await restClient.get( path ) ).data;
  },
  
  getScientificDegrees : async function () : Promise<any> {
	const { path } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : `${ PEOPLE_BASE_PATH }/scientific-degrees/`,
	} );
	return ( await restClient.get( path ) ).data;
  },
  
  getAcademicDegrees : async function () : Promise<any> {
	const { path } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : `${ PEOPLE_BASE_PATH }/academic-degrees/`,
	} );
	return ( await restClient.get( path ) ).data;
  },
  
  getEnglishLevels : async function () : Promise<any> {
	const { path } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : `${ PEOPLE_BASE_PATH }/english-levels/`,
	} );
	return ( await restClient.get( path ) ).data;
  },
  
  getTechnologyCategories : async function () : Promise<any> {
	const { path } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : `${ PEOPLE_BASE_PATH }/technology-categories/`,
	} );
	return ( await restClient.get( path ) ).data;
  },
  
  getLinesOfResearch : async function () : Promise<any> {
	const { path } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : `${ PEOPLE_BASE_PATH }/lines-of-research/`,
	} );
	return ( await restClient.get( path ) ).data;
  },
  
  getProvinces : async function ( { limit, search } ) : Promise<any> {
	const { path, query } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : `provinces/`,
	  queryParams : { limit, search },
	} );
	return ( await restClient.get( path, { params : { query } } ) ).data;
  },
  
  getAdministrationBodies : async function ( { limit, search } ) : Promise<any> {
	const { path } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : `administration-bodies/`,
	  queryParams : { limit, search },
	} );
	return ( await restClient.get( path ) ).data;
  },
  getKnowledgeGroups : async function () : Promise<any> {
	const { path } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : `${ KNOWLEDGE_BASE_PATH }-groups/`,
	} );
	return ( await restClient.get( path ) ).data;
  },
  
  getKnowledgeSubGroupsByUrl : async function ( url ) : Promise<any> {
	const { path } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : url,
	} );
	return ( await restClient.get( path ) ).data;
  },
  
  getKnowledgeFieldsByUrl : async function ( url ) : Promise<any> {
	const { path } = generateUrlAndQuery( {
	  version : VERSION,
	  basePath : url,
	} );
	return ( await restClient.get( path ) ).data;
  },
} );
