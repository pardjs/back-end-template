import { config as configEnv } from 'dotenv';
// read env config from .env file
configEnv();
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
export const SERVICE_NAME = process.env.SERVICE_NAME || 'ANOTHER_PARDJS_SERVICE';
export const APM_SERVICE_URL = process.env.APM_SERVICE_URL;
