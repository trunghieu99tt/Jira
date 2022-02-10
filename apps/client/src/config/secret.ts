import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string, ignore = false): string => {
  const value = process.env[key];
  if (!ignore && value === undefined) {
    console.log(`[ENV] ${key} not found!`);
  }
  return value || '';
};

export const GRAPHQL_SERVER_URL = getEnv('REACT_APP_GRAPHQL_SERVER_URL');
