import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
    PORT: number
    PRODUCTS_SERVICE_HOST: string
    PRODUCTS_SERVICE_PORT: number
}

const envSchema = joi.object<EnvVars>({
    PORT: joi.number().required(),
    PRODUCTS_SERVICE_HOST: joi.string().required(),
    PRODUCTS_SERVICE_PORT: joi.number().required(),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = envVars;

export const envs = {
    port: envsVars.PORT,
    productsServiceHost: envsVars.PRODUCTS_SERVICE_HOST,
    productsServicePort: envsVars.PRODUCTS_SERVICE_PORT,
}