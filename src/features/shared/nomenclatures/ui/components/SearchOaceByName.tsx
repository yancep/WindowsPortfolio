'use client';
import { useEffect, useState } from 'react';
import { BaseItemNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/BaseItemNomenclature';
import { SearchInputsProps } from '@/src/components/inputs/const/types';
import { useNomenclatureStore } from '@/src/features/shared/nomenclatures/ui/store/NomenclaturesStore';
import { CustomAutocompleteInput } from '@/src/components/inputs/autocompletes/CustomAutocompleteInput';

export default function SearchOACEByName( {
											form,
											label,
											isRequired = false,
											defaultValue,
											formKey,
										  } : SearchInputsProps<BaseItemNomenclature> ) {
  const { administrationBodies, getAdministrationBodies } =
	useNomenclatureStore();
  
  const [filterText, setFilterText] = useState<string>(
	defaultValue?.value ?? '',
  );
  
  useEffect( () => {
	getAdministrationBodies( { limit : 5, search : filterText } );
  }, [filterText] );
  
  return (
	<CustomAutocompleteInput<BaseItemNomenclature>
	  form={ form }
	  formKey={ formKey! }
	  items={ administrationBodies }
	  mapItemKey={ ( item ) => item.id! }
	  mapCompareValue={ ( option, value ) => option.id === value.id }
	  label={ 'OACE' }
	  isRequired={ isRequired }
	  inputValue={ filterText }
	  onClear={ () => setFilterText( '' ) }
	  placeholder={ 'Buscar OACE' }
	  mapItem={ ( item ) => (
		<div className="flex items-center justify-between">
		  <span className="text-wrap text-small text-overlay">{ item.name }</span>
		</div>
	  ) }
	  mapItemValue={ ( item ) => ( item as BaseItemNomenclature ).name! }
	  onInputChange={ ( e ) => setFilterText( e ) }
	  onSelectionChange={ ( item ) => {
		form.setFieldValue( 'oace', item.selectedKey );
	  } }
	  isLoading={ false }
	  defaultValue={ undefined }
	/>
  );
}
