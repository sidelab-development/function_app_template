import { randomUUID } from "crypto";

export class Sample {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({ name }: { name: string }) {
    this.id = randomUUID();
    this.name = name;
    this.updatedAt = new Date();
    this.createdAt = new Date();
  }
}
