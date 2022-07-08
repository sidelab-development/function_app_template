import { IPaginationOptions, IPaginationResponse } from '../../interfaces/pagination';

export function buildPaginationObject<T>(data: T[], total: number, { page, pageLength }: IPaginationOptions): IPaginationResponse<T> {
  return {
    total,
    page,
    pageLength,
    data,
  };
}
