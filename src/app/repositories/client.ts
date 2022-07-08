import { CosmosClient, Database } from '@azure/cosmos';
import { COSMOS_DB_ENDPOINT, COSMOS_DB_KEY, DATABASES } from './config';

const cosmosClient = new CosmosClient({
  endpoint: COSMOS_DB_ENDPOINT,
  key: COSMOS_DB_KEY,
});

const getDbClient = (): Database => cosmosClient.database(DATABASES.DEFAULT_DATABASE);

export { getDbClient };
