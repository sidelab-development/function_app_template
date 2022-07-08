import { ServiceBusClient } from '@azure/service-bus';
import { IGenericObject } from '../../interfaces/generic-object';
import { IMessageSystem } from './interface';

export class MessageSystem implements IMessageSystem {
  async sendToQueue(queueName: string, body: IGenericObject): Promise<void> {
    const sbClient = new ServiceBusClient(process.env.SERVICE_BUS_CONNECTION_STRING);
    const sender = sbClient.createSender(queueName);
    try {
      await sender.sendMessages({ body });
      await sender.close();
    } finally {
      await sbClient.close();
    }
  }
}
