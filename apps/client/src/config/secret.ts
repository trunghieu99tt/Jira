import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string, ignore = false): string => {
  const value = process.env[key];
  if (!ignore && value === undefined) {
    console.log(`[ENV] ${key} not found!`);
  }
  return value || '';
};

export const API_URL = getEnv('REACT_APP_API_URL');
export const SOCKET_URL = getEnv('REACT_APP_SOCKET_URL');
