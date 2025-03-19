/* eslint-disable @typescript-eslint/no-explicit-any */
import ChevronRightIcon from '@/public/icons/ChevronRightIcon';
import { APP_CLIENT_MANAGEMENT_ENTITY_ROUTES, APP_CLIENT_PROJECT_ROUTES, } from '@/src/core/routes/routes';
import AltGapidLogo from '@/src/components/Icons/app/alt/AltGapidLogo';
import { Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger, Spinner, User, } from "@heroui/react";
import { Project } from '@/src/features/projects/domain/entities/Project';

export function Trigger(props: any) {
  return (
    <PopoverTrigger>
      <div className="flex h-[65px] flex-row items-center justify-center">
        <User
          name={
            props.isCollapsed ? (
              ''
            ) : (
              <span className="text-sm">
                {props.item?.fullCode ?? props.item?.code}
              </span>
            )
          }
          avatarProps={{
            fallback: <AltGapidLogo />,
          }}
          description={
            props.isCollapsed ? (
              ''
            ) : (
              <span className="text-tiny">Cambiar a</span>
            )
          }
        />
      </div>
    </PopoverTrigger>
  );
}

export function PopEntity(props: any) {
  return (
    <ListboxItem key={'entity'}>
      <Popover placement="right-start">
        <PopoverTrigger>
          <div className={'flex flex-row items-center justify-between'}>
            {'Entidad'}
            <ChevronRightIcon height={12} width={12} />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Listbox
            classNames={{
              base: 'max-w-xs',
              list: 'max-h-[300px] overflow-scroll',
            }}
            selectionMode={'multiple'}
            variant="flat"
          >
            <ListboxItem
              key="entity"
              href={
                props.user?.person?.entity &&
                APP_CLIENT_MANAGEMENT_ENTITY_ROUTES.INFO(
                  props.user.person.entity?.id,
                )
              }
            >
              {props.user?.person?.entity?.name}
            </ListboxItem>
          </Listbox>
        </PopoverContent>
      </Popover>
    </ListboxItem>
  );
}

export function PopProgram(props: any) {
  return (
    <ListboxItem key={'program'}>
      <Popover placement="right-start">
        <PopoverTrigger
          onClick={() => {
            props.getPrograms();
          }}
        >
          <div className={'flex flex-row items-center justify-between'}>
            {'Programas'}
            <ChevronRightIcon height={12} width={12} />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          {/* {props.loadPrograms ? (
          <div className= 'p-2'><Spinner /></div>
        ) : (
          <Listbox
            classNames={{
              base: 'max-w-xs',
              list: 'max-h-[300px] overflow-scroll',
            }}
            selectionMode={'multiple'}
            variant="flat"
          >
            {props.programs!.map((e: ProgramModel) => (
              <ListboxItem
                key={e.id}
                onClick={() =>
                  props.replace(APP_CLIENT_PROGRAM_ROUTES.INFO(e.id))
                }
              >
                {e.abbreviatedName ?? e.name}
              </ListboxItem>
            ))}
          </Listbox>
        )} */}
          <div></div>
        </PopoverContent>
      </Popover>
    </ListboxItem>
  );
}

export function PopProject(props: any) {
  return (
    <ListboxItem key={'project'}>
      <Popover placement="right-start">
        <PopoverTrigger
          onClick={() => {
            props.getProjects();
          }}
        >
          <div className={'flex flex-row items-center justify-between'}>
            {'Projectos'}
            <ChevronRightIcon height={12} width={12} />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          {props.loadProjects ? (
            <div className="p-2">
              <Spinner />
            </div>
          ) : (
            <Listbox
              classNames={{
                base: 'max-w-xs',
                list: 'max-h-[300px] overflow-scroll',
              }}
              selectionMode={'multiple'}
              variant="flat"
            >
              {props.data.map((e: Project) => (
                <ListboxItem
                  key={e.id}
                  onClick={() =>
                    props.replace(APP_CLIENT_PROJECT_ROUTES.INFO(e.id))
                  }
                >
                  {e.abbreviatedName ?? e.name}
                </ListboxItem>
              ))}
            </Listbox>
          )}
        </PopoverContent>
      </Popover>
    </ListboxItem>
  );
}
