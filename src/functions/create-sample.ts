import { makeCreateSampleUseCase } from "@/factories/create-sample-use-case";
import { app, HttpRequest, HttpResponseInit } from "@azure/functions";

export async function createSample(
  request: HttpRequest
): Promise<HttpResponseInit> {
  const createSampleUseCase = makeCreateSampleUseCase();
  const result = await createSampleUseCase.execute(
    (await request.json()) as any // eslint-disable-line
  );
  return { body: JSON.stringify(result) };
}

app.http("sample", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: createSample,
});
