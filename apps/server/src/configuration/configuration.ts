import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  DEFAULT_API_KEY,
  JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  JWT_SECRET,
  PORT,
} from './env';

export default (): any => ({
  port: PORT,
  database: {
    host: DB_HOST,
    port: DB_PORT,
    name: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  },
  jwt: {
    secret: JWT_SECRET,
    accessTokenExpiresInSeconds: JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
    refreshTokenExpiresInSeconds: JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  },
  defaultApiKey: DEFAULT_API_KEY,
  graphql: {
    playground: true,
  },
});
