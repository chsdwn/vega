import { KeyValuePair } from './KeyValuePair';

export class Feature extends KeyValuePair {
  constructor(
    public id: number,
    public name: string,
    public selected: boolean = false
  ) {
    super(id, name);
  }
}
