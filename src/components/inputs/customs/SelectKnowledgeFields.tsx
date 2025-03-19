import { useEffect, useMemo, useState } from 'react';
import { FormikValues } from 'formik';
import {
  Chip,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Spinner,
} from "@heroui/react";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { MdClose } from 'react-icons/md';
import {
  nomenclatureRepository
} from '@/src/features/shared/nomenclatures/domain/repositories/NomenclaturesRepository';
import {
  KnowledgeFieldItem,
  KnowledgeGroupItem,
  KnowledgeSubgroupItem,
} from '@/src/features/shared/nomenclatures/domain/entities/KnowledgeFields';
import { CustomToolTip } from '@/src/components/tooltip/CustomTooltip';

interface Props {
  form : FormikValues;
  formKey : string;
  label : string;
  required? : boolean;
  defaultValues? : Array<KnowledgeFieldItem>;
}

export default function SelectKnowledgeFields( {
												 form,
												 formKey,
												 label,
												 required,
												 defaultValues,
											   } : Props ) {
  const [loadingSubGroups, setLoadingSubGroups] = useState( false );
  const [loadingKnowledgeFields, setLoadingKnowledgeFields] = useState( false );
  
  const [selectedItems, setSelectedItems] = useState<KnowledgeFieldItem[]>(
	defaultValues ?? [],
  );
  
  const [groups, setGroups] = useState<KnowledgeGroupItem[]>( [] );
  const [subGroups, setSubGroups] = useState<KnowledgeSubgroupItem[]>( [] );
  const [knowledgeFields, setKnowledgeFields] = useState<KnowledgeFieldItem[]>(
	[],
  );
  
  useEffect( () => {
	getKnowledgeGroups();
  }, [] );
  
  async function getKnowledgeGroups() : Promise<void> {
	const response = await nomenclatureRepository.getKnowledgeGroups();
	if ( response ) {
	  setGroups( response );
	} else {
	  console.error( 'Expected an array but got:', response );
	  setGroups( [] );
	}
  }
  
  async function getKnowledgeSubGroups( url : string ) {
	setLoadingSubGroups( true );
	const response = await nomenclatureRepository.getKnowledgeSubGroups( url );
	if ( response ) {
	  setLoadingSubGroups( false );
	  setSubGroups( response );
	}
  }
  
  async function getKnowledgeFields( url : string ) {
	setLoadingKnowledgeFields( true );
	const response = await nomenclatureRepository.getKnowledgeFields( url );
	setKnowledgeFields( response );
	if ( response ) {
	  setLoadingKnowledgeFields( false );
	}
  }
  
  const topContent = useMemo( () => {
	if ( !selectedItems.length ) {
	  return null;
	}
	return (
	  <div
		className="z-10 flex max-h-[100px] cursor-pointer flex-row flex-wrap overflow-y-auto overflow-ellipsis whitespace-nowrap rounded-lg border-2 border-default p-1 hover:border-primary ">
		{ selectedItems.map( ( value ) => {
		  return (
			<div className={ 'm-1' } key={ value.url }>
			  <Chip
				endContent={
				  <MdClose
					onClick={ () => {
					  handleSelection( value );
					} }
				  />
				}
				className={
				  'flex flex-row items-center rounded-md bg-default p-1 text-opacity-75'
				}
			  >
				<CustomToolTip info={ value.name }>
				  <div
					style={ {
					  width : 125,
					} }
					className="overflow-hidden overflow-ellipsis whitespace-nowrap font-sans text-sm"
				  >
					{ value.name }
				  </div>
				</CustomToolTip>
			  </Chip>
			</div>
		  );
		} ) }
	  </div>
	);
  }, [selectedItems] );
  
  const handleSelection = ( item : KnowledgeFieldItem ) => {
	const isSelected = selectedItems.find( ( e ) => e.url === item.url );
	if ( isSelected ) {
	  setSelectedItems( selectedItems.filter( ( e ) => e.url !== item.url ) );
	} else {
	  setSelectedItems( [...selectedItems, item] );
	}
  };
  
  useEffect( () => {
	if ( form ) {
	  form.setFieldValue(
		formKey,
		selectedItems.map( ( item ) => item.url ),
	  );
	}
  }, [selectedItems] );
  
  return (
	<div className="flex max-h-[100px] w-full flex-col">
	  <div className="flex flex-row items-center text-small text-foreground opacity-70">
		{ label }
		{ required && <div className="text-danger">*</div> }
	  </div>
	  <Popover placement="bottom" offset={ 3 }>
		<PopoverTrigger>
		  { selectedItems.length === 0 ? (
			<div
			  className={
				'cursor-pointer rounded-lg border-2 border-default px-2 py-1.5 hover:border-primary'
			  }
			>
              <span className={ 'text-small text-foreground opacity-75 ' }>
                Selecciona uno o varios campos del conocimiento
              </span>
			</div>
		  ) : (
			topContent
		  ) }
		</PopoverTrigger>
		<PopoverContent className={ 'w-full' }>
		  <Listbox
			selectionMode={ 'none' }
			classNames={ {
			  list : 'overflow-auto max-w-full ',
			} }
		  >
			{ groups.map( ( item ) => (
			  <ListboxItem
				key={ item.url }
				endContent={ <ChevronRightIcon height={ 12 } width={ 12 }/> }
				className={
				  'flex w-full flex-row items-center justify-between text-nowrap px-2'
				}
			  >
				<Popover placement="right-start" offset={ 5 }>
				  <PopoverTrigger
					onClick={ () => getKnowledgeSubGroups( item.subgroups ) }
				  >
					<div className={ 'flex flex-col text-wrap text-sm' }>
					  <span>{ item.name }</span>
					  <span className="text-tiny text-primary">
                        Código: { item.code }
                      </span>
					</div>
				  </PopoverTrigger>
				  <PopoverContent>
					{ loadingSubGroups ? (
					  <div className={ 'p-1' }>
						<Spinner size={ 'sm' }/>
					  </div>
					) : (
					  <Listbox
						classNames={ {
						  list : 'max-h-[300px] overflow-auto',
						} }
						variant="flat"
					  >
						{ subGroups.map( ( e ) => (
						  <ListboxItem
							key={ e.url }
							endContent={
							  <ChevronRightIcon height={ 12 } width={ 12 }/>
							}
							className={
							  'flex w-full flex-row items-center justify-between text-nowrap px-2'
							}
						  >
							<Popover placement="right-start" offset={ 5 }>
							  <PopoverTrigger
								onClick={ () =>
								  getKnowledgeFields( e.knowledgeFields )
								}
							  >
								<div
								  className={ 'flex flex-col text-wrap text-sm' }
								>
								  <span>{ e.name }</span>
								  <span className="text-tiny text-primary">
                                    Código: { e.code }
                                  </span>
								</div>
							  </PopoverTrigger>
							  <PopoverContent>
								{ loadingKnowledgeFields ? (
								  <div className={ 'p-1' }>
									<Spinner size={ 'sm' }/>
								  </div>
								) : (
								  <Listbox
									classNames={ {
									  list : 'max-h-[300px] max-w-sm overflow-y-auto',
									} }
									selectionMode={ 'multiple' }
									defaultSelectedKeys={ selectedItems.map(
									  ( e ) => e.url,
									) }
									variant="flat"
								  >
									{ knowledgeFields.map( ( e ) => (
									  <ListboxItem
										key={ e.url }
										textValue={ e.name }
										onClick={ () => handleSelection( e ) }
									  >
										<div
										  className={
											'flex flex-col text-wrap text-sm'
										  }
										>
										  <span>{ e.name }</span>
										  <span className="text-tiny text-primary">
                                            Código: { e.code }
                                          </span>
										</div>
									  </ListboxItem>
									) ) }
								  </Listbox>
								) }
							  </PopoverContent>
							</Popover>
						  </ListboxItem>
						) ) }
					  </Listbox>
					) }
				  </PopoverContent>
				</Popover>
			  </ListboxItem>
			) ) }
		  </Listbox>
		</PopoverContent>
	  </Popover>
	  <Spacer/>
	  <span className={ 'text-tiny text-danger' }>
        { form.touched[ formKey ] && form.errors[ formKey ]
		  ? form.errors[ formKey ]
		  : undefined }{ ' ' }
      </span>
	</div>
  );
}
