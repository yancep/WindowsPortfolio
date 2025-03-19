/* eslint-disable no-unused-vars */
import { Either } from 'fp-ts/Either';
import { CustomPagination } from '@/src/core/api/BaseState';
import { AccessBlacklisted } from '@/src/features/admin/data/models/securityAccessBlacklistedModel';
import { Query } from '@/src/core/api/services/url.service';
import { injector } from '@/src/ioc/utils/injector';
import { AdminDataModuleSymbols } from '@/src/features/admin/data/AdminDataModuleSymbols';

export interface SecurityRepository {
  getAccessBlacklisted: (
    request: Query,
  ) => Promise<Either<string, CustomPagination<AccessBlacklisted>>>;

  deleteAccessBlacklisted: (id: string) => Promise<Either<string, string>>;
}

export const securityRepository = injector<SecurityRepository>(
  AdminDataModuleSymbols.SECURITY_REPOSITORY,
);
