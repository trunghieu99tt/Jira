import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import configuration from './configuration';
import Joi from '@hapi/joi';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  load: [configuration],
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test'),
    PORT: Joi.number().default(3000),
    PROJECT_NAME: Joi.string().default('NestJS'),
    PROJECT_VERSION: Joi.string().default('1.0.0'),
    CLOUDINARY_PATH: Joi.string().default('/'),
    DB_PORT: Joi.number().default(27017),
    DB_HOST: Joi.string().default('localhost'),
    DB_NAME: Joi.string().default('nestjs'),
    DB_USER: Joi.string().default('root'),
    DB_PASSWORD: Joi.string().default('root'),
    JWT_SECRET: Joi.string().default('secret'),
    JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS: Joi.number().default(3600),
    JWT_REFRESH_TOKEN_EXPIRES_IN_SECONDS: Joi.number().default(3600),
    DEFAULT_API_KEY: Joi.string().default('secret'),
  }),
};
