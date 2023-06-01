import { Sample } from "@/entities/sample";
import { CreateSampleInput, SampleRepository } from "./interface";

export class FakeSampleRepository implements SampleRepository {
  async create(input: CreateSampleInput) {
    return new Sample(input);
  }
}
