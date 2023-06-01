import { it, expect, describe } from "vitest";
import { makeCreateSampleUseCase } from "@/factories/create-sample-use-case";

describe("CreateSampleUseCase", () => {
  it("should be able to create a new sample", async () => {
    const createSampleUseCase = makeCreateSampleUseCase();
    const sample = await createSampleUseCase.execute({ name: "hello world" });
    expect(sample.name).toBe("hello world");
  });
});
