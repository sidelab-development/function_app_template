export interface IPaginationOptions {
  page: number;
  pageLength: number;
}

export interface IPaginationDatabaseOptions {
  limit: number;
  offset: number;
}

export type ITotal = { total: number; }

export interface IPaginationResponse<T> {
  total: number;
  page: number;
  pageLength: number;
  data: T[];
}
