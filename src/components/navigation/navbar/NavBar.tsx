import { Spacer } from "@heroui/react";
import { ReactNode } from 'react';

interface NavBarProps {
  startIcon?: ReactNode;
  title: string;
  subtitle?: ReactNode;
  buttons?: ReactNode;
}

export function NavBar({ title, buttons, subtitle, startIcon }: NavBarProps) {
  return (
    <div className=" flex w-full flex-col pb-0 pl-4 pr-4">
      <div className="text-large font-semibold">
        <div className={'flex flex-row items-center'}>
          {startIcon}
          <Spacer />
          {title}
        </div>
      </div>
      <div>{subtitle}</div>
      <Spacer y={2} />
      {buttons ? buttons : <></>}
    </div>
  );
}

export function NavBarButtons({ buttons }: NavBarProps) {
  return (
    <div className="flex w-full flex-col">{buttons ? buttons : <></>}</div>
  );
}

// function NavBarButtons({
//   onOpen,
//   getPCTPrograms,
//   getSPPrograms,
// }: {
//   onOpen: () => void;
//   getPCTPrograms: () => void;
//   getSPPrograms: () => void;
// }) {
//   return (
//     <div className="w- full mt-4	flex flex-row items-center justify-around">
//       <div className="flex w-full flex-row">
//         <Spacer />
//         <Button variant="solid" color="primary">
//           <p>Todos</p>
//         </Button>
//         <Spacer />
//         <Dropdown>
//           <DropdownTrigger>
//             <Button
//               endContent={<ChevronDownIcon className="h-4 w-4" />}
//               variant="bordered"
//             >
//               <p>Tipo</p>
//             </Button>
//           </DropdownTrigger>
//           <DropdownMenu aria-title="Action event example">
//             <DropdownItem onClick={getPCTPrograms} key="programa">
//               Programas programa
//             </DropdownItem>
//             <DropdownItem onClick={getSPPrograms} key="projects">
//               Programas projects
//             </DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//       </div>
//       <Button color="primary" variant="solid" onPress={onOpen}>
//         Registrar programa
//       </Button>
//     </div>
//   );
// }
