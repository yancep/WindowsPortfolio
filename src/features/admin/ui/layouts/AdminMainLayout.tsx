'use client';
import { ReactNode } from 'react';
import { APP_ADMIN_ROUTES } from '@/src/core/routes/routes';
import {
  LinkModel,
  SideBar,
} from '@/src/components/navigation/sidebar/SideBar';
import {
  AppEntityIcon,
  AppParticipantsIcon,
  AppProgramIcon,
} from '@/src/components/Icons/app/sideBarIcons';
import Trace from '@/public/icons/Trace';
import Security from '@/public/icons/Security';
import CustomNavBar from '@/src/components/navigation/navbar/CustomNavBar';

export default function AdminMainLayout({ children }: { children: ReactNode }) {
  const links: LinkModel[] = [
    // {
    //   name: 'Tablero',
    //   href: APP_ADMIN_ROUTES.DASHBOARD,
    //   icon: <AppHomeIcon />,
    // },
    {
      name: 'Programas',
      href: APP_ADMIN_ROUTES.PROGRAMS,
      icon: <AppProgramIcon />,
    },
    {
      name: 'Entidades',
      href: APP_ADMIN_ROUTES.ENTITIES,
      icon: <AppEntityIcon />,
    },
    {
      name: 'Usuarios',
      href: APP_ADMIN_ROUTES.USERS,
      icon: <AppParticipantsIcon />,
    },
    {
      name: 'Trazas',
      href: APP_ADMIN_ROUTES.TRACE,
      icon: <Trace />,
    },
    {
      name: 'Seguridad',
      href: APP_ADMIN_ROUTES.SECURITY,
      icon: <Security />,
    },
  ];

  return (
    <SideBar baseLinks={links} backRoute={''} configRoute={''} configLinks={[]}>
      <section className={`flex h-full w-full flex-col`}>
        <CustomNavBar entities={undefined} brand={<div></div>} />
        {children}
      </section>
    </SideBar>
  );
}
