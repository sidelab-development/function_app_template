todo

[ ] tsprune
[ ] vitest
[ ] eslint
[ ] husky/hooks
[ ] build/tsup
[ ] deploy
[ ] hello world function

continue from here:
https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript?tabs=azure-cli%2Cbrowser&pivots=nodejs-model-v4#update-app-settings

https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=typescript%2Cwindows-setting-the-node-version&pivots=nodejs-model-v4

https://learn.microsoft.com/en-us/azure/azure-functions/functions-node-upgrade-v4?tabs=azure-cli-set-indexing-flag%2Cv4#enable-v4-programming-model

prerequisites

- The [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local#v2) version v4.0.5095 or above. Run `func --version` to check that the Azure Functions Core Tools are version v4.0.5095 or above.
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) version 2.4 or later. Run az --version to check that the Azure CLI version is 2.4 or later.
- [Node.js](https://nodejs.org/) version 18 or above. Run `node -v` to check that Node.js is version 18 or above.
- [TypeScript](https://www.typescriptlang.org/) version 4+.
- Run az login to sign in to Azure and verify an active subscription.

- After creating a new app, search for "sample" in the files and change for your own values.

Add a function to your project by using the following command:
func new
