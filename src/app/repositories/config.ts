export const COSMOS_DB_ENDPOINT = process.env.COSMOS_DB_ENDPOINT || '';
export const COSMOS_DB_KEY = process.env.COSMOS_DB_KEY || '';

if (COSMOS_DB_ENDPOINT.includes('https://localhost')) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export const DATABASES = {
  DEFAULT_DATABASE: 'default-db',
};

export const CONTAINERS = {
  USERS_CONTAINER: 'users',
};
