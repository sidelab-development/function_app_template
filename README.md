[X] eslint
[X] tsprune
[X] vitest
[X] husky/hooks
[X] build/tsup
[X] hello world function
[ ] deploy
-settings AzureWebJobsFeatureFlags=EnableWorkerIndexing

Ajustar template de pipe para rodar o prettier, eslint, coverage (mudar script)
CI - npx prettier --check .

prerequisites

- The [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local#v2) version v4.0.5095 or above. Run `func --version` to check that the Azure Functions Core Tools are version v4.0.5095 or above.
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) version 2.4 or later. Run az --version to check that the Azure CLI version is 2.4 or later.
- [Node.js](https://nodejs.org/) version 18 or above. Run `node -v` to check that Node.js is version 18 or above.
- [TypeScript](https://www.typescriptlang.org/) version 4+.
- Run az login to sign in to Azure and verify an active subscription.

- After creating a new app, search for "sample" in the files and change for your own values.

Add a function to your project by using the following command:
func new

- [ ] Create you own local.settings.json
