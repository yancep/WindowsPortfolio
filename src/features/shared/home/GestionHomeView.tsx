/* eslint-disable react/no-unescaped-entities */
'use client';

import { LoadingComponent } from '@/src/components/pageStates/LoadingComponent';
import { Spacer } from "@heroui/react";
import HomeCard from '@/src/features/shared/home/components/HomeCard';
import {
  AppProgramIcon,
  AppProjectIcon,
} from '@/src/components/Icons/app/sideBarIcons';
import React from 'react';
import CustomNavBar from '@/src/components/navigation/navbar/CustomNavBar';
import { ProgramsStore } from '@/src/features/admin/ui/stores/ProgramsStore';
import { useUserStore } from '@/src/features/users/ui/store/useUserStore';
import { User } from '@/src/features/users/domain/entities/User';
import { SystemRoleNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/SystemRoleNomenclatures';
import { useProjectsStore } from '@/src/features/projects/ui/layout/stores/useProjectsStore';

export default function GestionHomeView() {
  // data_sources users = JSON.parse(localStorage.getItem('users')!);

  const { data: user, isLoading: isLoadingUser, getUserMe } = useUserStore();

  const {
    getPrograms,
    data: programs,
    isLoading: loadingPrograms,
  } = ProgramsStore();

  const {
    getProjects,
    data: projects,
    isLoading: loadingProjects,
  } = useProjectsStore();

  React.useEffect(() => {
    getUserMe();
    getPrograms();
    getProjects();
  }, []);

  return loadingPrograms || loadingProjects || !user ? (
    <LoadingComponent text={'Cargando datos'} />
  ) : (
    <div className="flex h-full w-full flex-col ">
      <CustomNavBar
        entities={
          getEntitiesByRole(user, 'ENTITY_GENERAL_MANAGER') ?? undefined
        }
      />
      <div className="flex h-full w-full flex-col items-center justify-center p-4 ">
        {/*<Background />*/}
        <div className={'z-10 flex flex-col justify-center text-center'}>
          <span
            style={{
              fontSize: 20,
            }}
            className={' text-foreground opacity-70'}
          >
            Hola 👋🏻 {user?.person?.prefixName ?? user?.person?.fullName},
          </span>
          <span style={{ fontSize: 30, fontWeight: 'bold' }}>
            ¡Bienvenido a GAPID!
          </span>
          <Spacer y={2} />
          <span
            style={{ fontSize: 18 }}
            className={' text-foreground opacity-70'}
          >
            "Innovación sin límites: Potenciando la gestión de programas y
            proyectos de ciencia, tecnología e innovación"
          </span>
        </div>
        <Spacer y={10} />
        <div className="m-4 flex flex-row">
          {programs && programs?.length !== 0 && (
            <HomeCard
              title={'Programas'}
              subtitle={
                '¡Revisa, gestiona y haz que tus programa sean exitosos!'
              }
              data={programs}
              type={'program'}
              icon={<AppProgramIcon height={'60%'} width={'60%'} />}
            />
          )}
          <Spacer x={6} />
          {projects && projects?.length !== 0 && (
            <HomeCard
              title={'Proyectos'}
              subtitle={
                '¡Revisa tus proyectos, toma el control y haz que la innovación suceda!'
              }
              data={projects}
              type={'project'}
              icon={<AppProjectIcon height={'60%'} width={'60%'} />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const userHasRole = (user: User, role: SystemRoleNomenclature) => {
  return !!user.roles.find((e) => e.role.codeName === role);
};

export const getEntitiesByRole = (user: User, role: SystemRoleNomenclature) => {
  const entities = user.roles.find((e) => {
    if (e.role.codeName === role) return e.entities.map((e) => e);
  });
  return entities?.entities;
};
