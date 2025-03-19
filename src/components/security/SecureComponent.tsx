import { ReactNode } from 'react';
import { SystemRoleNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/SystemRoleNomenclatures';
import { useUserStore } from '@/src/features/users/ui/store/useUserStore';

/**
 * Protege el componente según el rol del usuario y la instancia a acceder
 * @param objectInstance Instancia del objeto a la que se está protegiendo
 * @param allowedRoles Roles del usuario y las instancias a las cuales puede acceder
 * @param children Elemento a renderizar si esta permitido
 * @param adminNotAllowed Si el admin tiene permisos para acceder al elemento
 */

export default function SecureComponent( {
										   allowedRoles,
										   children,
										   objectInstance,
										   adminNotAllowed,
										 } : {
  adminNotAllowed? : boolean;
  objectInstance : string;
  allowedRoles? : SystemRoleNomenclature[];
  children : ReactNode;
} ) {
  let isAllowed;
  const user = useUserStore( ( state ) => state.data );
  const roleData = user?.roles;
  
  isAllowed =
	user?.isAdmin ||
	roleData?.some(
	  ( roleNomenclature ) =>
		allowedRoles?.includes( roleNomenclature.role.codeName ) &&
		roleNomenclature.entities.includes( objectInstance ),
	);
  
  if ( adminNotAllowed ) {
	isAllowed = roleData?.some(
	  ( roleNomenclature ) =>
		allowedRoles?.includes( roleNomenclature.role.codeName ) &&
		roleNomenclature.entities.includes( objectInstance ),
	);
  }
  
  return isAllowed && <>{ children }</>;
}
