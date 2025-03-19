import { User } from '@/src/features/users/domain/entities/User';

export type crudEventModelPaginated = {
  itemCount: number;
  pageCount: number;
  next: string;
  currentPage: number;
  nextPage: number;
  previousPage: number | null;
  previous: number | null;
  results: CrudEventModel[];
};

export type CrudEventModel = {
  id: string;
  eventName: string;
  contentType: string;
  user: User;
  objectRepr: string;
  objectJsonRepr: string;
  changedFields: string;
  datetime: string;
};
