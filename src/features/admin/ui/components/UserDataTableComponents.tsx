import { VerticalDotsIcon } from '@/src/components/Icons/extra/TableIcons';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@heroui/react";
import moment from 'moment';

export function UserInformationPopover(props: any) {
  return (
    <Popover placement={'bottom'} showArrow={true} offset={20}>
      <PopoverTrigger>
        <User
          name={
            props.user.person
              ? props.user.person?.fullName
              : props.user.username
          }
          description={
            props.user.person ? props.user.person?.email : props.user.email
          }
          avatarProps={{
            showFallback: true,
            fallback: props.user.person
              ? props.user.person?.name.charAt(0)
              : '',
            src: props.user.person ? props.user.person?.avatarUrl : '',
          }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <section>
          <div>
            {props.user.person ? (
              <section>
                <div>
                  <span className="font-mono">ID: </span>
                  {props.user.person?.id}
                </div>
                <div>
                  <span className="font-mono">Nombre: </span>
                  {props.user.person?.fullName}
                </div>
                <div>
                  {' '}
                  <span className="font-mono">Email: </span>
                  {props.user.person?.email}
                </div>
                <div>
                  <span className="font-mono">Fecha de nacimiento: </span>
                  {moment(props.user.person?.dateOfBirth).format('DD/MM/YYYY')}
                </div>
                <div>
                  <span className="font-mono">CI: </span>{' '}
                  {props.user.person?.identityCard}
                </div>
                <div>
                  <span className="font-mono">Nivel de inglés: </span>
                  {props.user.person?.englishLevel != null
                    ? props.user.person?.englishLevel
                    : 'NULL'}
                </div>
                <div>
                  <span className="font-mono">Móvil: </span>{' '}
                  {props.user.person?.phone}
                </div>
                <div>
                  {' '}
                  <span className="font-mono">Sexo: </span>{' '}
                  {props.user.person?.sex}
                </div>
                <div>
                  {' '}
                  <span className="font-mono">Cuenta bancaria: </span>{' '}
                  {props.user.person?.bankAccount}
                </div>
                <div>
                  <span className="font-mono">Categoría educacional: </span>
                  {props.user.person?.educationalCategory != null
                    ? props.user.person?.educationalCategory
                    : 'NULL'}
                </div>
                <div>
                  {' '}
                  <span className="font-mono">Categoría científica: </span>
                  {props.user.person?.scientificCategory != null
                    ? props.user.person?.scientificCategory
                    : 'NULL'}
                </div>
                <div>
                  <span className="font-mono">Categoría tecnológica: </span>
                  {props.user.person?.technologyCategory != null
                    ? props.user.person?.technologyCategory
                    : 'NULL'}
                </div>
                <div>
                  <span className="font-mono">Nivel científico: </span>
                  {props.user.person?.scientificDegree != null
                    ? props.user.person?.scientificDegree
                    : 'NULL'}
                </div>
                <div>
                  <span className="font-mono">Entidad : </span>
                  {props.user.person?.entity
                    ? props.user.person?.entity.name
                    : 'NULL'}
                </div>
              </section>
            ) : (
              <span className="font-mono">No existe una persona</span>
            )}
          </div>
        </section>
      </PopoverContent>
    </Popover>
  );
}

export function UsersTableActions(props: any) {
  return (
    <Dropdown className="border-1 border-default-200 bg-background">
      <DropdownTrigger>
        <Button isIconOnly radius="sm" size="sm" variant="bordered">
          <VerticalDotsIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu disabledKeys={props.user.person ? 'person' : ''}>
        <DropdownItem
          key="edit"
          onClick={() =>
            props.handleAction(props.user.id, 'disabled', props.user.isEnabled)
          }
        >
          {props.user.isEnabled === true
            ? 'Deshabilitar usuario'
            : 'Habilitar usuario'}
        </DropdownItem>
        <DropdownItem
          key="password"
          onClick={() => props.handleAction(props.user.id, 'password')}
        >
          Cambiar contraseña
        </DropdownItem>
        {/* <DropdownItem key="delete" onClick={() => {}}>
       Eliminar usuario
      </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
}
