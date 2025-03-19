import { Program } from '@/src/features/programs/domain/entities/Program';
import { Entity } from '@/src/features/entities/domain/entities/Entity';
import { ProgramsStore } from '@/src/features/admin/ui/stores/ProgramsStore';
import {
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@heroui/react";
import { useEffect } from 'react';
import { Trigger } from '@/src/components/navigation/sidebar/featureSection/sections';
import {
  APP_CLIENT_MANAGEMENT_ENTITY_ROUTES,
  APP_CLIENT_PROGRAM_ROUTES,
  APP_CLIENT_PROJECT_ROUTES,
} from '@/src/core/routes/routes';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '@/src/features/users/ui/store/useUserStore';
import { getEntitiesByRole } from '@/src/features/shared/home/GestionHomeView';
import { useProjectsStore } from '@/src/features/projects/ui/layout/stores/useProjectsStore';
import { Project } from '@/src/features/projects/domain/entities/Project';

export type FeatureSectionProps = {
  item: Project | Program | Entity | undefined | null;
  isCollapsed: boolean;
};

export default function FeaturesSection({
  item,
  isCollapsed,
}: FeatureSectionProps) {
  const { data: user } = useUserStore();
  let entities;

  const {
    getPrograms,
    data: programs,
    isLoading: loadPrograms,
  } = ProgramsStore();

  const {
    getProjects,
    data: projects,
    isLoading: loadProjects,
  } = useProjectsStore();

  useEffect(() => {
    if (user) {
      const entities = getEntitiesByRole(user, 'ENTITY_GENERAL_MANAGER');
    }
  }, []);

  return (
    <div className="cursor-pointer">
      <Popover placement="bottom-start" className="w-[150px]" offset={5}>
        <Trigger item={item} isCollapsed={isCollapsed} />
        <PopoverContent>
          <Listbox
            selectionMode={'none'}
            classNames={{
              list: 'overflow-scroll',
            }}
          >
            <ListboxItem key={'entity'}>
              <Popover placement="right-start">
                <PopoverTrigger>
                  <div className={'flex flex-row items-center justify-between'}>
                    Entidad
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <Listbox
                    classNames={{
                      base: 'max-w-xs',
                      list: 'max-h-[300px] overflow-scroll',
                    }}
                    selectionMode={'none'}
                    variant="flat"
                    emptyContent="Sin registros"
                    items={[user?.person?.entity] as any[]}
                  >
                    {(item) => (
                      <ListboxItem
                        key="entity"
                        href={
                          item &&
                          APP_CLIENT_MANAGEMENT_ENTITY_ROUTES.INFO(item.id)
                        }
                      >
                        {item?.code ?? item?.abbreviatedName}
                      </ListboxItem>
                    )}
                  </Listbox>
                </PopoverContent>
              </Popover>
            </ListboxItem>
            <ListboxItem key={'program'}>
              <Popover placement="right" offset={25}>
                <PopoverTrigger
                  onClick={() => getPrograms({ fields: 'id code' })}
                >
                  <div className={'flex flex-row items-center justify-between'}>
                    {'Programas'}
                    <ChevronRightIcon height={14} width={14} />
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  {loadPrograms ? (
                    <div className="p-2">
                      <Spinner />
                    </div>
                  ) : (
                    <Listbox
                      classNames={{
                        base: 'max-w-xs',
                        list: 'max-h-[300px] overflow-scroll',
                      }}
                      selectionMode={'none'}
                      variant="flat"
                      emptyContent="Sin registros"
                      items={programs ?? []}
                    >
                      {(item) => (
                        <ListboxItem
                          key={item.id}
                          href={item && APP_CLIENT_PROGRAM_ROUTES.INFO(item.id)}
                        >
                          {item.code}
                        </ListboxItem>
                      )}
                    </Listbox>
                  )}
                </PopoverContent>
              </Popover>
            </ListboxItem>
            <ListboxItem key={'project'}>
              <Popover placement="right-start" offset={25}>
                <PopoverTrigger
                  onClick={() =>
                    getProjects({ fields: 'project {id full_code}' })
                  }
                >
                  <div className={'flex flex-row items-center justify-between'}>
                    {'Proyectos'}
                    <ChevronRightIcon height={14} width={14} />
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  {loadProjects ? (
                    <div className="p-2">
                      <Spinner />
                    </div>
                  ) : (
                    <Listbox
                      classNames={{
                        base: 'max-w-xs',
                        list: 'max-h-[300px] overflow-scroll',
                      }}
                      selectionMode={'none'}
                      variant="flat"
                      emptyContent="Sin registros"
                      items={projects ?? []}
                    >
                      {(item) => (
                        <ListboxItem
                          key={item.project.id}
                          href={
                            item &&
                            APP_CLIENT_PROJECT_ROUTES.INFO(item.project.id)
                          }
                        >
                          {item.project.fullCode}
                        </ListboxItem>
                      )}
                    </Listbox>
                  )}
                </PopoverContent>
              </Popover>
            </ListboxItem>
          </Listbox>
        </PopoverContent>
      </Popover>
    </div>
  );
}
