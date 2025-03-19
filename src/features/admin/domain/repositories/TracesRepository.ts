/* eslint-disable no-unused-vars */
import { Either } from 'fp-ts/Either';
import { CustomPagination } from '@/src/core/api/BaseState';
import { CrudEventModel } from '@/src/features/admin/data/models/crudEventsModel';
import { RequestEventModel } from '../../data/models/requestEventsModel';
import { LoginEventModel } from '../../data/models/loginEventsModel';
import { Query } from '@/src/core/api/services/url.service';
import { injector } from '@/src/ioc/utils/injector';
import { AdminDataModuleSymbols } from '@/src/features/admin/data/AdminDataModuleSymbols';

export interface TracesRepository {
  getCrudEvents: (
    request: Query,
  ) => Promise<Either<string, CustomPagination<CrudEventModel>>>;
  getRequestEvents: (
    request: Query,
  ) => Promise<Either<string, CustomPagination<RequestEventModel>>>;
  getLoginEvents: (
    request: Query,
  ) => Promise<Either<string, CustomPagination<LoginEventModel>>>;
}

export const tracesRepository = injector<TracesRepository>(
  AdminDataModuleSymbols.TRACES_REPOSITORY,
);
