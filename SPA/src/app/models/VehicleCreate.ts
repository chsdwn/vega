import { Contact } from './Contact';

export class VehicleCreate {

  constructor(
    public modelId: number,
    public isRegistered: boolean,
    public features: number[],
    public contact: Contact
  ) { }

}
