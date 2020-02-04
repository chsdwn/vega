import { KeyValuePair } from './KeyValuePair';

export class VehicleList {

  constructor(
    public id: number,
    public make: KeyValuePair,
    public model: KeyValuePair,
    public isRegistered: boolean,
    public contactName: string,
    public lastUpdate: Date
  ) { }

}
