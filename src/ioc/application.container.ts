import { Container } from 'inversify';
import { ProgramsRepositoriesModule } from '@/src/features/programs/ioc/ProgramsRepositories.Module';
import { EntitiesRepositoriesModule } from '@/src/features/entities/ioc/EntitiesRepositories.Module.ts';
import { AuthenticationModule } from '@/src/features/authentication/ioc/Authentication.Module';
import { ServicesModule } from '@/src/features/shared/Services.Module';
import { NetworkModule } from '@/src/ioc/common/network.module';
import { UserModule } from '@/src/features/users/domain/User.Module';
import { TokenServiceModule } from './common/tokenService.module';
import { PeopleModule } from '../features/persons/ioc/Persons.Module';
import { ProjectsDataSourcesModule } from '../features/projects/ioc/ProjectDataSources.Module';
import { ProjectsRepositoriesModule } from '../features/projects/ioc/ProjectRepositorios.Module';
import { EntitiesDataSourcesModule } from '../features/entities/ioc/EntitiesDataSources.Module';
import { ProgramsDataSourcesModule } from '../features/programs/ioc/ProgramsDataSources.Module';
import { SecurityDataSourcesModule } from '../features/admin/ioc/SecurityDataSources.Module';
import { TracesDataSourcesModule } from '../features/admin/ioc/TracesDataSources.Module';
import { SecurityRepositoriesModule } from '../features/admin/ioc/SecurityRepositories.Module';
import { TracesRepositoriesModule } from '../features/admin/ioc/TracesRepositories.Module';
import { FilesServiceDataSourcesModule } from '@/src/features/shared/files/ioc/FileServiceDataSources.Module';
import { FilesServiceRepositoriesModule } from '@/src/features/shared/files/ioc/FileServiceRepository.Module';

const ApplicationContainer = new Container( {
  skipBaseClassChecks : true,
  defaultScope : 'Singleton',
  autoBindInjectable : true,
} );

/**
 * Es necesario injectar los data_sources y los respositorios por separado
 */
const initializeContainer = () => {
  //Common
  ApplicationContainer.load( TokenServiceModule );
  ApplicationContainer.load( NetworkModule );
  
  //Authentication
  ApplicationContainer.load( AuthenticationModule );
  
  //Services
  ApplicationContainer.load( ServicesModule );
  
  //Shared features
  ApplicationContainer.load( UserModule );
  ApplicationContainer.load( PeopleModule );
  
  //Features:
  //DataSources
  ApplicationContainer.load( FilesServiceDataSourcesModule );
  ApplicationContainer.load( SecurityDataSourcesModule );
  ApplicationContainer.load( TracesDataSourcesModule );
  ApplicationContainer.load( EntitiesDataSourcesModule );
  ApplicationContainer.load( ProjectsDataSourcesModule );
  ApplicationContainer.load( ProgramsDataSourcesModule );
  
  //Repositories
  ApplicationContainer.load( FilesServiceRepositoriesModule );
  ApplicationContainer.load( SecurityRepositoriesModule );
  ApplicationContainer.load( TracesRepositoriesModule );
  ApplicationContainer.load( EntitiesRepositoriesModule );
  ApplicationContainer.load( ProjectsRepositoriesModule );
  ApplicationContainer.load( ProgramsRepositoriesModule );
};

initializeContainer();

export { ApplicationContainer, initializeContainer };
