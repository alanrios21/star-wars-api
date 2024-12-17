import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod').optional(),
  API_PORT: Joi.number().integer().optional().default(3000),
  API_HEADER_FIELD_NAME: Joi.string().optional(),
  API_KEY: Joi.string().optional(),
  API_URL: Joi.string().optional(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRY: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.number().integer().required(),
  DB_HOST: Joi.string().required(),
  CLOUDINARY_NAME: Joi.string().optional(),
  CLOUDINARY_API_KEY: Joi.string().optional(),
});