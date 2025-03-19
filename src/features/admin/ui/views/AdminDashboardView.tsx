// 'use client';
// import { ReactNode } from 'react';
// import {
//   AppParticipantsIcon,
//   AppUsersIcon,
// } from '@/src/components/Icons/app/sideBarIcons';
// import { CustomButton } from '@/src/components/buttons/CustomButton';
// import CustomPieChart from '@/src/components/charts/CustomPieChart';
// import { Card, Spacer } from '@heroui/react';
// import CustomLineChart from '@/src/components/charts/CustomLineChart';
//
// const programStats = [
//   {
//     id: 1,
//     label: ' Nacionales: 8',
//     value: 8,
//   },
//
//   {
//     id: 2,
//     label: 'Sectoriales: 10 ',
//     value: 10,
//   },
//   {
//     id: 3,
//     label: ' Territoriales: 8 ',
//     value: 8,
//   },
//   {
//     id: 4,
//     label: ' Institucionales: 0 ',
//     value: 0,
//   },
// ];
//
// const projectsStats = [
//   {
//     id: 1,
//     label: ' Investigación Aplicada',
//     value: 2,
//   },
//   {
//     id: 2,
//     label: 'Innovación',
//     value: 2,
//   },
//   {
//     id: 4,
//     label: 'Desarrollo Experimental',
//     value: 2,
//   },
//   {
//     id: 3,
//     label: ' Investigación básica',
//     value: 2,
//   },
// ];
//
// export default function AdminDashboardView() {
//   const UsersAndPersonsStats = () => (
//     <div className=" flex flex-col items-start justify-center gap-4 ">
//       <div className={'flex items-center '}>
//         <CustomButton
//           radius={'full'}
//           size={'lg'}
//           onClick={undefined}
//           icon={<AppParticipantsIcon width={'30'} height={'30'} />}
//           isIconOnly
//           color={'default'}
//           variant={'solid'}
//         />
//         <Spacer x={2} />
//         <div className={'flex flex-col'}>
//           <div className="flex flex-row items-center">
//             <span className={'text-medium'}>489</span>
//             <Spacer />
//             <span className={'text-tiny text-primary'}>+100 ↗︎</span>
//           </div>
//           <span className={'text-tiny'}>Total de personas</span>
//         </div>
//       </div>
//     </div>
//   );
//
//   return (
//     // <div>
//     //   <ReactToPrint
//     //     trigger={() => <button>Imprimir Componente</button>}
//     //     content={() => componentRef.current}
//     //   />
//     <div className="flex h-full w-full flex-row flex-wrap gap-4  overflow-y-auto p-4">
//       <div className={'flex flex-col'}>
//         <StatsCard className="h-[80px] w-[200px] ">
//           <UsersAndPersonsStats />
//         </StatsCard>
//         <StatsCard className={'mt-4 h-[200px] w-[200px]'}>
//           <div className=" flex flex-col items-start justify-center p-2">
//             <div className={' flex items-center'}>
//               <CustomButton
//                 radius={'full'}
//                 size={'lg'}
//                 onClick={undefined}
//                 icon={<AppUsersIcon width={'30'} height={'30'} />}
//                 isIconOnly
//                 color={'default'}
//                 variant={'solid'}
//               />
//               <Spacer x={2} />
//               <div className={'flex flex-col'}>
//                 <div className="flex flex-row items-center">
//                   <span className={'text-medium'}>120</span>
//                   <Spacer />
//                   <span className={'text-tiny text-primary'}>+7 ↗︎</span>
//                 </div>
//                 <span className={'text-tiny'}>Total de Usuarios</span>
//               </div>
//             </div>
//             <Spacer y={4} />
//             <div className={'flex flex-col pl-2'}>
//               <div className={'flex items-center'}>
//                 <CustomButton
//                   radius={'full'}
//                   size={'sm'}
//                   onClick={undefined}
//                   icon={<AppUsersIcon width={'20'} height={'20'} />}
//                   isIconOnly
//                   color={'default'}
//                   variant={'solid'}
//                 />
//                 <Spacer x={2} />
//                 <div className={'flex flex-col'}>
//                   <div className="flex flex-row items-center">
//                     <span className={'text-tiny'}>120</span>
//                     <Spacer />
//                     <span className={'text-tiny text-primary'}>+7 ↗︎</span>
//                   </div>
//                   <span className={'text-tiny'}>Usuarios Activos</span>
//                 </div>
//               </div>
//               <Spacer y={4} />
//               <div className={'flex items-center'}>
//                 <CustomButton
//                   radius={'full'}
//                   size={'sm'}
//                   onClick={undefined}
//                   icon={<AppUsersIcon width={'20'} height={'20'} />}
//                   isIconOnly
//                   color={'danger'}
//                   variant={'bordered'}
//                 />
//                 <Spacer x={2} />
//                 <div className={'flex flex-col'}>
//                   <div className="flex flex-row items-center">
//                     <span className={'text-tiny'}>120</span>
//                     <Spacer />
//                     <span className={'text-tiny text-primary'}>+7 ↗︎</span>
//                   </div>
//                   <span className={'text-tiny'}>Usuarios Bloqueados</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </StatsCard>
//       </div>
//       <StatsCard className="flex h-[300px] w-[450px] flex-col ">
//         <div>
//           <span className={'font-semibold'}>Total de Programas: 26</span>
//         </div>
//         <CustomPieChart
//           data={programStats}
//           properties={{
//             paddingLeft: 160,
//           }}
//           math={{ total: 26 }}
//         />
//       </StatsCard>
//       <StatsCard className="flex h-[300px] w-[490px] flex-col ">
//         <div>
//           <span className={'font-semibold'}>Total de Proyectos: 8</span>
//         </div>
//         <CustomPieChart
//           data={projectsStats}
//           properties={{
//             paddingLeft: 190,
//           }}
//           math={{ total: 8 }}
//         />
//       </StatsCard>
//       <StatsCard className="flex h-[450px] w-full">
//         <CustomLineChart />
//       </StatsCard>
//     </div>
//     // </div>
//   );
// }
//
// interface StartCardProps {
//   className: string;
//   children: ReactNode;
// }
//
// function StatsCard({ className, children }: StartCardProps) {
//   return (
//     <div className={className}>
//       <Card className={'h-full w-full p-2'}>{children}</Card>
//     </div>
//   );
// }
