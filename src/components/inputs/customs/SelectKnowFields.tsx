// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-unused-vars */
// import { FormikValues } from 'formik';
// import { useEffect, useMemo, useState } from 'react';
// import {
//   Button,
//   Chip,
//   Input,
//   Listbox,
//   ListboxItem,
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
//   ScrollShadow,
//   Spinner,
// } from '@heroui/react';
// import { ChevronRightIcon } from '@heroicons/react/24/outline';
// import { MdClose } from 'react-icons/md';
// import RestClient from '@/src/core/api/shared/config/rest.client';
// import { KnowledgeFielItem, KnowledgeGroupItem, KnowledgeSubgroupItem } from '@/src/features/shared/nomenclatures/domain/entities/KnowledgeFields';

// type TreeItem = {
//   key: string;
//   label: string;
//   items: TreeItem[];
// };

// type Props = {
//   form?: FormikValues;
//   formKey: string;
//   label: string;
// };

// export default function SelectKnowFields({ form, formKey, label }: Props) {

//   const [loadingSubGroups, setLoadingSubGroups] = useState(false);
//   const [loadingKnowledgeFields, setLoadingKnowledgeFields] = useState(false);

//   const [values, setValues] = useState<KnowledgeFielItem[]>([]);

//   const [groups, setGroups] = useState<KnowledgeGroupItem[]>([]);
//   const [subGroups, setSubGroups] = useState<KnowledgeSubgroupItem[]>([]);
//   const [knowledgeFields, setKnowledgeFields] = useState<KnowledgeFielItem[]>(
//     [],
//   );

//   useEffect(() => {
//     getKnowledgeGroups();
//   }, []);

//   async function getKnowledgeGroups(): Promise<void> {
//     setLoadingSubGroups(true);

//     try {
//       const response = await rest.get('v1/knowledge-field-groups/');

//       setGroups(response.data);
//     } catch (e) {
//       console.log('');
//     }
//     setLoadingSubGroups(false);
//   }

//   async function getKnowledgeSubGroups(groupId: number) {
//     setLoadingSubGroups(true);
//     try {
//       const response = await rest.get('v1/knowledge-field-groups/');

//       setSubGroups(response.data);
//     } catch (e) {
//       console.log('');
//     }
//     setLoadingSubGroups(false);
//   }

//   async function getKnowledgeFields(subGroupId: number) {
//     setLoadingKnowledgeFields(true);
//     try {
//       const response = await rest.get('v1/knowledge-field-groups/');

//       setKnowledgeFields(response.data);
//     } catch (e) {
//       console.log('');
//     }
//     setLoadingKnowledgeFields(false);
//   }

//   const topContent = useMemo(() => {
//     if (!values.length) {
//       return null;
//     }

//     return (
//       <div className="m-2 flex w-full items-center gap-1 rounded-md border-1 px-2 py-1">
//         <ScrollShadow hideScrollBar orientation="horizontal">
//           {values.map((value) => {
//             return (
//               <Chip
//                 key={value.id}
//                 size="md"
//                 endContent={
//                   <Button
//                     size="sm"
//                     color="danger"
//                     variant="bordered"
//                     isIconOnly
//                     startContent={<MdClose />}
//                     onClick={() => {}}
//                   />
//                 }
//               >
//                 {value.fieldName}
//               </Chip>
//             );
//           })}
//         </ScrollShadow>
//       </div>
//     );
//   }, [values]);

//   const handleSelection = (item: KnowledgeFielItem) => {
//     const isSelected = values.find((e) => e.id === item.id);
//     if (isSelected) {
//       setValues(values.filter((e) => e.id !== item.id));
//     } else {
//       setValues([...values, item]);
//     }
//   };

//   return (
//     <div>
//       {groups.map((e) => e.name)}
//       {subGroups.map((e) => e.name)}
//       {knowledgeFields.map((e) => e.fieldName)}
//       <Popover placement="bottom" offset={0}>
//         <PopoverTrigger>
//           {values.length === 0 ? (
//             <Input
//               label={'ProgramExpertsView'}
//               labelPlacement="outside"
//               placeholder="Seleccionar"
//             />
//           ) : (
//             topContent
//           )}
//         </PopoverTrigger>
//         <PopoverContent>
//           <Listbox
//             selectionMode={'none'}
//             classNames={{
//               list: 'overflow-scroll',
//             }}
//           >
//             {groups.map((item) => (
//               <ListboxItem key={item.id}>
//                 <Popover placement="right-start">
//                   <PopoverTrigger
//                     onClick={() => getKnowledgeSubGroups(item.id)}
//                   >
//                     <div
//                       className={'flex flex-row items-center justify-between'}
//                     >
//                       {item.name}
//                       <ChevronRightIcon height={12} width={12} />
//                     </div>
//                   </PopoverTrigger>
//                   <PopoverContent>
//                     {loadingSubGroups ? (
//                       <Spinner />
//                     ) : (
//                       <Listbox
//                         classNames={{
//                           base: 'max-w-xs',
//                           list: 'max-h-[300px] overflow-scroll',
//                         }}
//                         variant="flat"
//                       >
//                         {subGroups.map((e) => (
//                           <ListboxItem key={e.id}>
//                             <Popover placement="right-start">
//                               <PopoverTrigger
//                                 onClick={() => {
//                                   getKnowledgeFields(e.id);
//                                 }}
//                               >
//                                 <div
//                                   className={
//                                     'flex flex-row items-center justify-between'
//                                   }
//                                 >
//                                   {e.name}
//                                   <ChevronRightIcon height={12} width={12} />
//                                 </div>
//                               </PopoverTrigger>
//                               <PopoverContent>
//                                 {loadingKnowledgeFields ? (
//                                   <Spinner />
//                                 ) : (
//                                   <Listbox
//                                     classNames={{
//                                       base: 'max-w-xs',
//                                       list: 'max-h-[300px] overflow-scroll',
//                                     }}
//                                     selectionMode={'multiple'}
//                                     variant="flat"
//                                   >
//                                     {knowledgeFields.map((e) => (
//                                       <ListboxItem
//                                         key={e.id}
//                                         textValue={e.fieldName}
//                                         onClick={() => handleSelection(e)}
//                                       >
//                                         {e.fieldName}
//                                       </ListboxItem>
//                                     ))}
//                                   </Listbox>
//                                 )}
//                               </PopoverContent>
//                             </Popover>
//                           </ListboxItem>
//                         ))}
//                       </Listbox>
//                     )}
//                   </PopoverContent>
//                 </Popover>
//               </ListboxItem>
//             ))}
//           </Listbox>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
