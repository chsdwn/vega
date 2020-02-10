import { Pagination } from './Pagination';

export class Sorting extends Pagination{

  constructor(
    public order: string,
    public pageSize: number,
    public pageNumber: number
  ) {
    super(pageSize, pageNumber);
  }

}
