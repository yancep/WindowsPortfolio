import { Divider, Spacer } from "@heroui/react";
import clsx from 'clsx';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { AppConfigIcon } from '@/src/components/Icons/app/sideBarIcons';
import { User } from '@/src/features/users/domain/entities/User';

export interface SideBarState {
  isOpen: boolean;
}

interface Props {
  user: User | undefined | null;
  sideBarState: SideBarState;
  routes: {
    config: string;
  };
}

export default function ConfigSection({ user, routes, sideBarState }: Props) {
  const pathname = usePathname();

  return (
    <>
      <Link
        key={'administracion'}
        href={routes.config!}
        passHref
        className="flex w-full items-center justify-between"
      >
        <Divider
          style={{
            width: 5,
            height: 30,
            borderRadius: 50,
            background: pathname === routes.config ? '#008060' : 'transparent',
          }}
          orientation="vertical"
        />
        <Spacer />
        <div
          style={{
            cursor: 'pointer',
            borderRadius: 10,
            width: 300,
            padding: 10,
            height: 50,
            textWrap: 'nowrap',
          }}
          className={clsx(
            'flex items-center justify-start p-2 text-medium hover:bg-default-100',
            pathname === routes.config && 'bg-default-100',
          )}
        >
          <AppConfigIcon />
          <Spacer />
          {!sideBarState.isOpen && <p className="pl-3">Configuraciones</p>}
        </div>
      </Link>
    </>
  );
}
