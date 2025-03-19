import { useEffect, useState } from 'react';
import { connectivityRepository } from '@/src/features/shared/connectivity/domain/ConnectivityServiceRepository';
import { CustomToast } from '@/src/components/toast/CustomToast';

export default function VerifyConnectivity() {
  const [isConnected, setIsConnected] = useState( true ); // Initial connection state
  
  useEffect( () => {
	// Check connection immediately and set interval for every 5 minutes
	checkConnection(); // Initial check
	const intervalId = setInterval( checkConnection, 300000 ); // 300000 ms = 5 minutes
	
	return () => clearInterval( intervalId ); // Cleanup on unmount
  }, [isConnected] );
  
  const checkConnection = async () => {
	console.log( 'Verifying connection with the backend' );
	
	try {
	  const response = await connectivityRepository.verifyConnection();
	  handleConnectionState( response );
	} catch ( error ) {
	  console.error( 'Error verifying connection:', error );
	  if ( isConnected ) {
		updateConnectionState(
		  false,
		  'Se ha perdido la conexión con el servidor',
		);
	  }
	}
  };
  
  const handleConnectionState = ( response : any ) => {
	if ( response ) {
	  if ( !isConnected ) {
		updateConnectionState(
		  true,
		  'La conexión con el servidor se ha restablecido',
		);
	  }
	} else {
	  if ( isConnected ) {
		updateConnectionState(
		  false,
		  'Se ha perdido la conexión con el servidor',
		);
	  }
	}
  };
  
  const updateConnectionState = ( connectionStatus : any, message : any ) => {
	setIsConnected( connectionStatus );
	CustomToast( {
	  content : (
		<div className={ 'flex flex-col' }>
		  <span>{ message }</span>
		</div>
	  ),
	} );
  };
  
  return null; // This component does not render anything visually
}
