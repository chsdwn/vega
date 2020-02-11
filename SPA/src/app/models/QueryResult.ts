import { VehicleList } from './VehicleList';

export class QueryResult {

  constructor(
    public totalItems: number,
    public items: VehicleList[]
  ) { }

}
