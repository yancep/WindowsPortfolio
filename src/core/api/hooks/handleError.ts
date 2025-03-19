/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';

interface CustomError {
  code : string;
  detail : string;
}

export function handleError( axiosError : AxiosError ) : string {
  if ( axiosError.response?.data ) {
	const myError : CustomError = axiosError.response?.data as CustomError;
	return myError.detail;
  } else if ( axiosError.code === 'ECONNABORTED' ) {
	return 'La solicitud ha caducado. Por favor, inténtelo de nuevo más tarde.';
  } else if ( !axiosError.response ) {
	return 'Error de red. Por favor, verifique su conexión a internet.';
  } else {
	const status = axiosError.response.status;
	switch (status) {
	  case 400:
		return 'Solicitud incorrecta. Por favor, verifique los parámetros de su solicitud.';
	  case 401:
		return 'No autorizado. Por favor, inicie sesión de nuevo.';
	  case 403:
		return 'Prohibido. No tiene permiso para acceder a este recurso.';
	  case 404:
		return 'Recurso no encontrado.';
	  case 500:
		return 'Error interno del servidor. Por favor, inténtelo de nuevo más tarde.';
	  default:
		return `Se ha producido un error con el código de estado: ${ status }`;
	}
  }
}

// const handleMappedErrorForCode = (code: string) => {
//   console.log(code);

//   switch (code) {
//     case 'invalid_credentials':
//       return 'Credenciales inválidas';
//     case 'wrong password':
//       return 'Contraseña actual incorrecta';
//     case 'unauthorized':
//       return 'Usuario no autorizado';
//     case 'invitation_has_been_used':
//       return 'La invitación ya ha sido utilizada';
//     case 'send_invitation_request_limit':
//       return 'Ha excedido el límite de envíos, inténtelo luego';
//     case 'can_not_delete_head_of_program':
//       return 'No se puede eliminar al jefe de un programa';
//     case 'can_not_delete_secretary_of_program':
//       return 'No se puede eliminar al secretario de un programa';
//     case 'person_in_program':
//       return 'Ya existe esta persona en el programa';
//     case 'token_not_valid':
//       return 'Token inválido';
//     default:
//       return `Se ha producido un error, por favor verifique que los datos estén correctos`;
//   }
// };

// // {"email":["We couldn't find an account associated with that email. Please try a different e-mail address."]}
