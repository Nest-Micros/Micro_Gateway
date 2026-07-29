import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
    PORT: number
    // PRODUCTS_SERVICE_HOST: string
    // PRODUCTS_SERVICE_PORT: number
    // ORDERS_SERVICE_HOST: string
    // ORDERS_SERVICE_PORT: number
    NATS_URL: string[]
}

const envSchema = joi.object<EnvVars>({
    PORT: joi.number().required(),
    // PRODUCTS_SERVICE_HOST: joi.string().required(),
    // PRODUCTS_SERVICE_PORT: joi.number().required(),
    // ORDERS_SERVICE_HOST: joi.string().required(),
    // ORDERS_SERVICE_PORT: joi.number().required(),
    NATS_URL: joi.array().items(joi.string()).required(),
}).unknown(true);

const { error, value: envVars } = envSchema.validate({
    ...process.env,
    NATS_URL: process.env?.NATS_URL?.split(',') || [],
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = envVars;

export const envs = {
    port: envsVars.PORT,
    // productsServiceHost: envsVars.PRODUCTS_SERVICE_HOST,
    // productsServicePort: envsVars.PRODUCTS_SERVICE_PORT,
    // ordersServiceHost: envsVars.ORDERS_SERVICE_HOST,
    // ordersServicePort: envsVars.ORDERS_SERVICE_PORT,
    natsUrl: envsVars.NATS_URL,
}