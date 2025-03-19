import { User } from '@/src/features/users/domain/entities/User';

export type requestEventModelPaginated = {
  itemCount: number;
  pageCount: number;
  next: string | null;
  currentPage: number | null;
  nextPage: number | null;
  previousPage: number | null;
  previous: number | null;
  results: RequestEventModel[];
};

export type RequestEventModel = {
  id: number;
  user: User;
  url: string;
  method: string;
  queryString: string;
  remoteIp: string;
  datetime: string;
};
