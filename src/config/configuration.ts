// config/configuration.ts
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as Joi from 'joi';

// 获取项目运行环境
export const getEnv = (): string => {
  return process.env.NODE_ENV || 'env.local';
};

/**
 * 对象验证逻辑
 */
const schema = Joi.object().keys({
  SERVER: Joi.object({
    port: Joi.number().default(8000),
    host: Joi.string().required(),
  }),
  LOG_CONFIG: Joi.object({
    TIMESTAMP: Joi.boolean().default(false),
    LOG_LEVEL: Joi.string().valid('info', 'error').required(),
    LOG_ON: Joi.boolean().default(false),
  }),
  DATABASE: Joi.object({
    username: Joi.string().default('root'),
    password: Joi.string().default('03252416Gmx!@#'),
    synchronize: Joi.boolean().default(false),
    database: Joi.string().required(),
    host: Joi.string().default('127.0.0.1'),
    port: Joi.string().default('3306'),
    type: Joi.string().default('mysql'),
  }),
});

export const getConfig = () => {
  const environment = getEnv().trim();
  const yamlPath = join(process.cwd(), `./src/config/.${environment}.yaml`);
  const config = yaml.load(readFileSync(yamlPath, 'utf8')) as Record<
    string,
    any
  >;
  try {
    const { value, error } = schema.validate(config);
    if (error) {
      console.log(error);
    }
    return value;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default getConfig;
