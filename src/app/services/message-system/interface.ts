import { IGenericObject } from '../../interfaces/generic-object';

export interface IMessageSystem {
  sendToQueue: (queueName: string, body: IGenericObject) => Promise<void>
}
