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
