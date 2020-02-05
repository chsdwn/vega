import { KeyValuePair } from './KeyValuePair';

export class Make {

  constructor(
    public id: number,
    public name: string,
    public models: KeyValuePair[]
  ) { }

}
