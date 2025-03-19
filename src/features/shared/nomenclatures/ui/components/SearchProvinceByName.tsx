import React, { Key, useState } from 'react';
import { Autocomplete, AutocompleteItem, Spacer } from "@heroui/react";
import { useAsyncList } from '@react-stately/data';
import { nomenclatureRepository } from '@/src/features/shared/nomenclatures/domain/repositories/NomenclaturesRepository';
import {
  Municipally,
  ProvinceNomenclature,
} from '@/src/features/shared/nomenclatures/domain/entities/ProvinceNomenclature';
import { SearchInputsProps } from '@/src/components/inputs/const/types';
import { BaseItemNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/BaseItemNomenclature';
import CustomSelect from '@/src/components/inputs/basic/CustomSelect';
import { SearchIcon } from "@heroui/shared-icons";

export default function SearchProvinceByName({
  form,
  label,
  isRequired = false,
  defaultValue,
  formKey,
  municipalAvailable = false,
}: SearchInputsProps<BaseItemNomenclature> & {
  municipalAvailable: boolean;
}) {
  const [municipalities, setMunicipalities] = useState<Municipally[]>([]);

  const list = useAsyncList<ProvinceNomenclature>({
    async load({ signal, filterText }) {
      const response = await nomenclatureRepository.getProvinces({
        search: filterText,
        limit: 5,
      });

      return {
        items: response,
      };
    },
  });

  return (
    <div className={'flex w-full flex-row'}>
      <div
        className={`flex ${municipalAvailable && municipalities.length !== 0 ? 'flex-1' : ''} w-full flex-col`}
      >
        {label && (
          <span className="flex flex-row text-small text-foreground opacity-70">
            {label}
            {isRequired && <div className="text-danger">*</div>}
          </span>
        )}
        <Autocomplete
          fullWidth
          allowsCustomValue={true}
          placeholder="Buscar"
          aria-label="AutoComplete"
          allowsEmptyCollection={true}
          shouldCloseOnBlur
          onFocus={form.onFocus}
          onBlur={form.handleBlur}
          inputValue={list.filterText}
          isLoading={list.isLoading}
          items={list.items}
          variant="bordered"
          onSelectionChange={(key) => {
            const province = list.items.filter((e) => e.id.toString() === key);
            if (!key) {
              setMunicipalities([]);
            } else {
              setMunicipalities(province[0].municipalities);
            }
            form.setFieldValue('province', key);
          }}
          selectorIcon={<SearchIcon />}
          onInputChange={list.setFilterText}
          listboxProps={AutoCompleteListboxProps}
          popoverProps={AutoCompletePopoverProps}
          classNames={AutoCompleteClassNames}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <Spacer />
      <div
        className={`flex ${municipalAvailable && municipalities.length !== 0 ? 'flex-1' : ''} flex-row`}
      >
        {municipalAvailable && municipalities.length !== 0 && (
          <CustomSelect
            mapKey={(item) => item.dpa as string}
            mapItem={(item) => item.name as string}
            label={'Municipio'}
            items={municipalities}
            form={form}
            formKey={'municipally'}
            isRequired={true}
          />
        )}
      </div>
    </div>
  );
}

export const AutoCompleteListboxProps = {
  hideSelectedIcon: false,
  itemClasses: {
    base: [
      'text-default-500',
      'transition-opacity',
      'payload-[hover=true]:text-foreground',
      'dark:payload-[hover=true]:bg-default-50',
      'payload-[pressed=true]:opacity-70',
      'payload-[hover=true]:bg-default-200',
      'payload-[selectable=true]:focus:bg-default-100',
      'payload-[focus-visible=true]:ring-default-500',
    ],
  },
};

export const AutoCompletePopoverProps = {
  offset: 3,
  classNames: {
    content: 'p-1 rounded-small border-default-100 bg-background ',
  },
};

export const AutoCompleteClassNames = {
  listboxWrapper: 'max-h-[200px] ',
  selectorButton: 'text-default-500',
};
