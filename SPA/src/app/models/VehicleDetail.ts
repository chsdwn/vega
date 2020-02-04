import { KeyValuePair } from './KeyValuePair';
import { Contact } from './Contact';

export class VehicleDetail {

  constructor(
    public id: number,
    public make: KeyValuePair,
    public model: KeyValuePair,
    public isRegistered: boolean,
    public features: KeyValuePair[],
    public contact: Contact,
    public lastUpdate: Date
  ) { }

}
