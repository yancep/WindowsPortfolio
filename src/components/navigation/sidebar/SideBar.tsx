import { Card, Divider, ScrollShadow, Spacer } from "@heroui/react";
import { usePathname } from 'next/navigation';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { ReactNode, useState } from 'react';
import HomeSection from './HomeSection';
import { LinkSection } from './LinkSection';
import { Entity } from '@/src/features/entities/domain/entities/Entity';
import { Program } from '@/src/features/programs/domain/entities/Program';
import { Project } from '@/src/features/projects/domain/entities/Project';
import FeaturesSection from './featureSection/FeatureSection';
import { useUserStore } from '@/src/features/users/ui/store/useUserStore';

export type LinkModel = {
  name: string;
  href?: string;
  icon?: ReactNode;
  links?: LinkModel[];
  notification?: boolean;
  info?: string;
};

export const SideBar = ({
  baseLinks,
  configLinks,
  children,
  item,
  servicesLinks,
}: {
  headerChildren?: ReactNode;
  children: ReactNode;
  baseLinks: LinkModel[];
  configLinks?: LinkModel[];
  servicesLinks?: LinkModel[];
  backRoute?: string;
  configRoute?: string;

  item?: Project | Program | Entity | undefined | null;
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSideBarButton = () => setSidebarOpen(!isSidebarOpen);
  const { data: user } = useUserStore();
  const pathname = usePathname();
  const isConfigRoute = pathname.includes('configuraciones');
  const finalLinks = isConfigRoute ? configLinks : baseLinks;

  return (
    <section className="flex h-full w-full flex-row">
      <div className="relative">
        <Card
          className="absolute right-0 top-20 z-10 flex h-7 w-7 translate-x-[50%] cursor-pointer items-center
           justify-center rounded-[30%] bg-default-50 text-[1.1rem]"
          isPressable
          onPress={() => {
            toggleSideBarButton();
          }}
        >
          {isSidebarOpen ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
        </Card>
        <Card className="sidebar rounded-[0px]" data-collapse={isSidebarOpen}>
          {pathname.includes('gestion') && (
            <>
              <FeaturesSection item={item} isCollapsed={isSidebarOpen} />
              <Spacer y={2} />
            </>
          )}
          <ScrollShadow>
            {pathname.includes('gestion') && (
              <div className={'flex w-full flex-row items-center'}>
                <Divider className={'flex-1'} />
                <Spacer />
                <span className={'flex-1 text-nowrap text-sm text-opacity-40'}>
                  Ir a
                </span>
                <Spacer />
                <Divider className={'flex-1'} />
              </div>
            )}
            {pathname.includes('gestion') && (
              <HomeSection
                isSidebarOpen={isSidebarOpen}
                user={user}
                pathname={pathname}
              />
            )}
            <Spacer y={2} />
            {pathname.includes('gestion') && (
              <div className={'flex w-full flex-row items-center'}>
                <Divider className={'flex-1'} />
                <Spacer />
                <span
                  className={
                    'flex-1 justify-center text-nowrap text-sm text-opacity-40'
                  }
                >
                  {!isSidebarOpen ? (
                    pathname.includes('gestion/programa') ? (
                      'Gestionar programa'
                    ) : pathname.includes('gestion/proyecto') &&
                      'Gestionar proyecto' ? (
                      pathname.includes('gestion/entidad') &&
                      'Gestionar Entidad'
                    ) : (
                      ''
                    )
                  ) : (
                    <Divider />
                  )}
                </span>
                <Spacer />
                <Divider className={'flex-1'} />
              </div>
            )}
            {pathname.includes('administracion') && (
              <div className={'flex w-full flex-row items-center'}>
                <Divider className={'flex-1'} />
                <Spacer />
                <span
                  className={
                    'flex-1 justify-center text-nowrap text-sm text-opacity-40'
                  }
                >
                  {!isSidebarOpen ? 'Administración' : <Divider />}
                </span>
                <Spacer />
                <Divider className={'flex-1'} />
              </div>
            )}
            <Spacer y={2} />
            <LinkSection
              finalLinks={finalLinks!}
              pathname={pathname}
              isCollapsed={isSidebarOpen}
            />
            <Spacer y={2} />
            {servicesLinks && (
              <div className={`flex w-full flex-col`}>
                {pathname.includes('gestion') && (
                  <div className={'flex w-full flex-row items-center'}>
                    <Divider className={'flex-1'} />
                    <Spacer />
                    <span
                      className={
                        'flex-1 justify-center text-nowrap text-sm text-opacity-40'
                      }
                    >
                      {!isSidebarOpen ? 'Servicios' : <Divider />}
                    </span>
                    <Spacer />
                    <Divider className={'flex-1'} />
                  </div>
                )}
                <Spacer y={2} />
                <LinkSection
                  finalLinks={servicesLinks}
                  pathname={pathname}
                  isCollapsed={isSidebarOpen}
                />
              </div>
            )}
          </ScrollShadow>
        </Card>
      </div>
      {children}
    </section>
  );
};
