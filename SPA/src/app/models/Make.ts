import { Model } from './Model';

export class Make {

  constructor(
    public id: number,
    public name: string,
    public models: Model[]
  ) { }

}
