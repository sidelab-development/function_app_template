/* eslint-disable @typescript-eslint/no-unused-vars */
import { IGenericObject } from '../../../app/interfaces/generic-object';
import { IMessageSystem } from '../../../app/services/message-system/interface';

export class FakeMessageSystem implements IMessageSystem {
  async sendToQueue(_queueName: string, _body: IGenericObject): Promise<void> {
    return null;
  }
}
