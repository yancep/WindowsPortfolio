import { create } from 'zustand';
import { BaseItemNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/BaseItemNomenclature';
import { injector } from '@/src/ioc/utils/injector';
import {
  NomenclaturesRepository
} from '@/src/features/shared/nomenclatures/domain/repositories/NomenclaturesRepository';

import { Query } from '@/src/core/api/services/url.service';
import { ServicesDataModuleSymbols } from '@/src/features/shared/Services.Module';
import { ProvinceNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/ProvinceNomenclature';

type NomenclaturesStore = {
  scientificCategory : BaseItemNomenclature[];
  educationalCategories : BaseItemNomenclature[];
  scientificDegrees : BaseItemNomenclature[];
  academicDegrees : BaseItemNomenclature[];
  englishLevels : BaseItemNomenclature[];
  technologyCategories : BaseItemNomenclature[];
  lineOfResearch : BaseItemNomenclature[];
  provinces : ProvinceNomenclature[];
  administrationBodies : BaseItemNomenclature[];
  
  getProvinces : ( request : Query ) => void;
  getAdministrationBodies : ( request : Query ) => void;
  
  getScientificCategory : () => void;
  getEducationalCategories : () => void;
  getScientificDegrees : () => void;
  getAcademicDegrees : () => void;
  getEnglishLevels : () => void;
  getTechnologyCategories : () => void;
  getLineOfResearch : () => void;
};

const nomenclaturesRepository = injector<NomenclaturesRepository>(
  ServicesDataModuleSymbols.NOMENCLATURES_REPOSITORY,
);

export const useNomenclatureStore = create<NomenclaturesStore>()(
  ( setState ) => ( {
	scientificCategory : [],
	educationalCategories : [],
	scientificDegrees : [],
	academicDegrees : [],
	englishLevels : [],
	technologyCategories : [],
	lineOfResearch : [],
	provinces : [],
	administrationBodies : [],
	
	getScientificCategory : async () => {
	  const response = await nomenclaturesRepository.getScientificCategory();
	  if ( response ) {
		setState( () => ( { scientificCategory : response } ) );
	  }
	},
	getEducationalCategories : async () => {
	  const response = await nomenclaturesRepository.getEducationalCategories();
	  if ( response ) {
		setState( () => ( { educationalCategories : response } ) );
	  }
	},
	getScientificDegrees : async () => {
	  const response = await nomenclaturesRepository.getScientificDegrees();
	  if ( response ) {
		setState( () => ( { scientificDegrees : response } ) );
	  }
	},
	getAcademicDegrees : async () => {
	  const response = await nomenclaturesRepository.getAcademicDegrees();
	  if ( response ) {
		setState( () => ( { academicDegrees : response } ) );
	  }
	},
	getEnglishLevels : async () => {
	  const response = await nomenclaturesRepository.getEnglishLevels();
	  if ( response ) {
		setState( () => ( { englishLevels : response } ) );
	  }
	},
	getTechnologyCategories : async () => {
	  const response = await nomenclaturesRepository.getTechnologyCategories();
	  if ( response ) {
		setState( () => ( { technologyCategories : response } ) );
	  }
	},
	
	getLineOfResearch : async () => {
	  const response = await nomenclaturesRepository.getLinesOfResearch();
	  if ( response ) {
		setState( () => ( { lineOfResearch : response } ) );
	  }
	},
	
	getProvinces : async ( request ) => {
	  const response = await nomenclaturesRepository.getProvinces( request );
	  
	  if ( response ) {
		setState( () => ( { provinces : response } ) );
	  }
	},
	getAdministrationBodies : async ( request ) => {
	  const response =
		await nomenclaturesRepository.getAdministrationBodies( request );
	  
	  if ( response ) {
		setState( () => ( { administrationBodies : response } ) );
	  }
	},
  } ),
);
