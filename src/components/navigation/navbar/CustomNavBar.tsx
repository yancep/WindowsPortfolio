import {
  Modal,
  ModalContent,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spacer,
  useDisclosure,
  User,
} from "@heroui/react";
import AltGapidLogo from '../../Icons/app/alt/AltGapidLogo';
import EntityIcon from '@/public/icons/EntityIcon';
import Link from 'next/link';
import { APP_CLIENT_MANAGEMENT_ENTITY_ROUTES } from '@/src/core/routes/routes';
import React, { ReactNode, useEffect } from 'react';
import { useUserStore } from "@/src/features/users/ui/store/useUserStore";
import { ProfileConfig } from "@/src/features/users/ui/components/modals/ProfileConfig";

export default function CustomNavBar(
  {
	entities,
	brand,
  } : {
	entities : any;
	brand? : ReactNode;
  } ) {
  const { data : currentUser, getUserMe, isLoading } = useUserStore();
  const { isOpen, onClose, onOpen } = useDisclosure();
  
  useEffect( () => {
	!currentUser && getUserMe();
  }, [] );
  
  return (
	<>
	  <Navbar maxWidth="full" isBordered>
		<NavbarBrand>
		  { brand ?? (
			<div className={ 'flex flex-row items-center' }>
			  <AltGapidLogo/>
			  <Spacer/>
			  <span className="text-[20px] font-semibold text-inherit ">
              GAPID
            </span>
			</div>
		  ) }
		</NavbarBrand>
		<Spacer/>
		<NavbarContent justify="end">
		  { entities && (
			<NavbarItem>
			  <Link
				className=" cursor-pointed flex flex-row items-center"
				href={ APP_CLIENT_MANAGEMENT_ENTITY_ROUTES.INFO( entities ) }
			  >
				<EntityIcon/>
				<Spacer/>
				<span>Mi entidad</span>
			  </Link>
			</NavbarItem>
		  ) }
		  <NavbarItem>
			<User
			  as="button"
			  name={ '' }
			  description={ '' }
			  avatarProps={ {
				fallback : currentUser?.username?.charAt( 0 ).toUpperCase(),
				showFallback : true,
				isBordered : false,
				src : '' as string,
				onClick : () => onOpen()
			  } }
			  className={ 'transition-transform' }
			/>
		  </NavbarItem>
		</NavbarContent>
	  </Navbar>
	  { currentUser && <Modal
          isOpen={ isOpen }
          onClose={ onClose }
          size={ '4xl' }
          scrollBehavior={ 'inside' }
      >
          <ModalContent className={ 'h-[70vh]' }>
              <ProfileConfig user={ currentUser } onCloseModal={ onClose }/>
          </ModalContent>
      </Modal> }
	</>
  
  );
}
