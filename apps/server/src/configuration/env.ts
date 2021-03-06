import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string): string => {
  return process.env[key] || '';
};

// server
export const NODE_ENV = getEnv('NODE_ENV');
export const PORT = Number(getEnv('SERVER_PORT'));

// project
export const PROJECT_NAME = getEnv('PROJECT_NAME');
export const PROJECT_VERSION = getEnv('PROJECT_VERSION');

// Cloudinary
export const CLOUDINARY_URL = getEnv('CLOUDINARY_URL');
export const CLOUDINARY_PATH = getEnv('CLOUDINARY_PATH');

// MongoDB
export const DB_PORT = Number(getEnv('DB_PORT'));
export const DB_HOST = getEnv('DB_HOST');
export const DB_NAME = getEnv('DB_NAME');
export const DB_USER = getEnv('DB_USER');
export const DB_PASSWORD = getEnv('DB_PASSWORD');

// Auth
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS = Number(
  getEnv('JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS'),
);
export const JWT_REFRESH_TOKEN_EXPIRES_IN_SECONDS = Number(
  getEnv('JWT_REFRESH_TOKEN_EXPIRES_IN_SECONDS'),
);
export const DEFAULT_API_KEY = getEnv('DEFAULT_API_KEY');

// Mailer
export const MAILER_EMAIL_ID = getEnv('MAILER_EMAIL_ID');
export const MAILER_PASSWORD = getEnv('MAILER_PASSWORD');

// Infura
export const INFURA_PROJECT_ID = getEnv('INFURA_PROJECT_ID');
export const INFURA_PROTOCOL = getEnv('INFURA_PROTOCOL');
export const INFURA_HOST = getEnv('INFURA_HOST');
export const INFURA_PORT = getEnv('INFURA_PORT')
  ? parseInt(getEnv('INFURA_PORT'), 10)
  : 5001;
export const INFURA_PROJECT_SECRET = getEnv('INFURA_PROJECT_SECRET');

export const SERVER_ADDRESS = getEnv('SERVER_ADDRESS');

// Google
export const GOOGLE_CLIENT_ID = getEnv('GOOGLE_CLIENT_ID');
export const GOOGLE_SECRET = getEnv('GOOGLE_SECRET');

// Github
export const GITHUB_CLIENT_ID = getEnv('GITHUB_CLIENT_ID');
export const GITHUB_CLIENT_SECRET = getEnv('GITHUB_CLIENT_SECRET');
export const GITHUB_REDIRECT_URL = getEnv('GITHUB_REDIRECT_URL');
