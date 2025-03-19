import { BaseItemNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/BaseItemNomenclature';
import { Query } from '@/src/core/api/services/url.service';
import { ProvinceNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/ProvinceNomenclature';
import { injector } from '@/src/ioc/utils/injector';
import { ServicesDataModuleSymbols } from '@/src/features/shared/Services.Module';
import {
  KnowledgeFieldItem,
  KnowledgeGroupItem,
  KnowledgeSubgroupItem,
} from '@/src/features/shared/nomenclatures/domain/entities/KnowledgeFields';

export interface NomenclaturesRepository {
  //Person
  getScientificCategory : () => Promise<BaseItemNomenclature[]>;
  
  getEducationalCategories : () => Promise<BaseItemNomenclature[]>;
  
  getScientificDegrees : () => Promise<BaseItemNomenclature[]>;
  
  getAcademicDegrees : () => Promise<BaseItemNomenclature[]>;
  
  getEnglishLevels : () => Promise<BaseItemNomenclature[]>;
  
  getTechnologyCategories : () => Promise<BaseItemNomenclature[]>;
  
  getLinesOfResearch : () => Promise<BaseItemNomenclature[]>;
  
  getProvinces : ( request : Query ) => Promise<ProvinceNomenclature[]>;
  getAdministrationBodies : ( request : Query ) => Promise<BaseItemNomenclature[]>;
  
  getKnowledgeGroups : () => Promise<KnowledgeGroupItem[]>;
  getKnowledgeSubGroups : ( url : string ) => Promise<KnowledgeSubgroupItem[]>;
  getKnowledgeFields : ( url : string ) => Promise<KnowledgeFieldItem[]>;
}

export const nomenclatureRepository = injector<NomenclaturesRepository>(
  ServicesDataModuleSymbols.NOMENCLATURES_REPOSITORY,
);
