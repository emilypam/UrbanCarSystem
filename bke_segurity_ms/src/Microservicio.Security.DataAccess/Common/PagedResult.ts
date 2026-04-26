export class PagedResult<T> {
  public readonly items: T[];
  public readonly total: number;
  public readonly page: number;
  public readonly pageSize: number;
  public readonly totalPages: number;
  public readonly hasNextPage: boolean;
  public readonly hasPreviousPage: boolean;

  constructor(items: T[], total: number, page: number, pageSize: number) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.pageSize = pageSize;
    this.totalPages = Math.ceil(total / pageSize);
    this.hasNextPage = page < this.totalPages;
    this.hasPreviousPage = page > 1;
  }
}
