import { SampleRepository } from "@/repositories/sample/interface";

interface CreateSampleInput {
  name: string;
}

export class CreateSampleUseCase {
  constructor(private sampleRepository: SampleRepository) {
    this.sampleRepository = sampleRepository;
  }

  async execute(sample: CreateSampleInput) {
    return this.sampleRepository.create(sample);
  }
}
