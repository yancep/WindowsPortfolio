import { ConnectivityServiceRepository } from '@/src/features/shared/connectivity/domain/ConnectivityServiceRepository';
import { ConnectivityServiceDataSources } from './ConnectivityServiceDataSource';

export const ConnectivityServiceRepositoryImpl = (
  connectionDataSources : ConnectivityServiceDataSources,
) : ConnectivityServiceRepository => ( {
  verifyConnection : async function () : Promise<boolean> {
	try {
	  const response = await connectionDataSources.verifyConnection();
	  
	  return true;
	} catch ( error : any ) {
	  return false;
	}
  },
} );
