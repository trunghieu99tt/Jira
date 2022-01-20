import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string): string => {
  return process.env[key] || '';
};

// server
export const NODE_ENV = getEnv('NODE_ENV');
export const PORT = Number(getEnv('PORT'));

// project
export const PROJECT_NAME = getEnv('PROJECT_NAME');
export const PROJECT_VERSION = getEnv('PROJECT_VERSION');

// Cloudinary
export const CLOUDINARY_URL = getEnv('CLOUDINARY_URL');
export const CLOUDINARY_PATH = getEnv('CLOUDINARY_PATH');

// MongoDB
export const MONGO_URL = getEnv('MONGO_URL');
export const MONGO_DB_NAME = getEnv('MONGO_DB_NAME');
export const MONGO_USERNAME = getEnv('MONGO_USERNAME');
export const MONGO_PASSWORD = getEnv('MONGO_PASSWORD');
export const DATABASE_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.xblod.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

// Auth
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_EXP = Number(getEnv('JWT_EXP'));

// Mailer
export const MAILER_EMAIL_ID = getEnv('MAILER_EMAIL_ID');
export const MAILER_PASSWORD = getEnv('MAILER_PASSWORD');
