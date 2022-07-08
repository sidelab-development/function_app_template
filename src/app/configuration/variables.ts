const VARIABLES = {
  ENVIRONMENT: process.env.ENVIRONMENT || 'dev',
  REGION: process.env.REGION || 'eastus',
  SHORT_REGION: process.env.SHORT_REGION || 'eus',
  SECRET_KEY: process.env.TOKEN_SECRET_KEY || 'default-key',
};

export default VARIABLES;
