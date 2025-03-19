export type loginEventModelPaginated = {
  itemCount: number;
  pageCount: number;
  next: string | null;
  currentPage: number | null;
  nextPage: number | null;
  previousPage: number | null;
  previous: number | null;
  results: LoginEventModel[];
};

export type LoginEventModel = {
  id: number;
  loginType: number;
  username: string;
  remoteIp: string;
  datetime: string;
  user: string;
};
