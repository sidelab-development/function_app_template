import { FakeSampleRepository } from "@/repositories/sample/fake";
import { SampleRepository } from "@/repositories/sample/interface";
import { CreateSampleUseCase } from "@/use-cases/sample/create-sample";

export function makeCreateSampleUseCase() {
  let sampleRepository: SampleRepository;

  if (process.env.NODE_ENV === "test") {
    sampleRepository = new FakeSampleRepository();
  } else {
    sampleRepository = new FakeSampleRepository(); // Change for a real repository
  }

  return new CreateSampleUseCase(sampleRepository);
}
