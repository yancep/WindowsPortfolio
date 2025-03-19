export interface ProvinceNomenclature {
  id: string;
  name?: string;
  dpa?: string;
  municipalities: Municipally[];
}

export interface Municipally {
  dpa: string;
  name: string;
}
