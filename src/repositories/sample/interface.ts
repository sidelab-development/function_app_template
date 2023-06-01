import { Sample } from "@/entities/sample";

export interface CreateSampleInput {
  name: string;
}

export interface SampleRepository {
  create(sample: CreateSampleInput): Promise<Sample>;
}
