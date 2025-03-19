import { Chip, Spacer } from "@heroui/react";
import { ReactNode } from 'react';
import Link from 'next/link';
import {
  AppProgramIcon,
  AppProjectIcon,
} from '@/src/components/Icons/app/sideBarIcons';
import {
  APP_CLIENT_PROGRAM_ROUTES,
  APP_CLIENT_PROJECT_ROUTES,
} from '@/src/core/routes/routes';

export default function HomeCard(props: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  data: any[];
  type: 'program' | 'project' | 'programa' | 'project-programa';
}) {
  return (
    <div className="card z-10">
      <div className="poster">
        <div className="flex flex-col p-4">
          <span
            style={{
              fontSize: 18,
            }}
            className="  font-semibold"
          >
            {props.title}
          </span>
          <span
            style={{
              fontSize: 16,
            }}
            className={' text-justify text-lg  text-foreground opacity-70'}
          >
            {props.subtitle}
          </span>
          <Spacer />
          <div className="flex flex-row items-center justify-center">
            {props.icon}
          </div>
        </div>
      </div>
      <div
        className="details overflow-y-auto"
        style={{
          backgroundColor: '#06C5951A',
        }}
      >
        {props.data?.map((e, index) => (
          <Link
            key={index}
            href={{
              pathname:
                props.type === 'project'
                  ? APP_CLIENT_PROJECT_ROUTES.INFO(e.project.id)
                  : APP_CLIENT_PROGRAM_ROUTES.INFO(e.id),
              query: {
                id: e.id,
              },
            }}
            passHref
          >
            <Chip
              size={'sm'}
              avatar={
                props.type === 'project' ? (
                  <AppProjectIcon height={'14'} width={'14'} />
                ) : (
                  <AppProgramIcon height={'14'} width={'14'} />
                )
              }
              style={{
                margin: 3,
                display: 'flex',
                flexDirection: 'row',
                background: '#fffffff',
                cursor: 'pointer',
              }}
            >
              {props.type === 'project' && e.project.fullCode}
              {props.type === 'program' && e.code}
            </Chip>
          </Link>
        ))}
      </div>
    </div>
  );
}
