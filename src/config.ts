import { config as configEnv } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
// read env config from .env file
configEnv();
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
export const APM_SERVICE_URL = process.env.APM_SERVICE_URL;
export const SERVICE_BASE = process.env.SERVICE_BASE;
const projectInfo = JSON.parse(readFileSync(join(process.cwd(), 'project-info.json')).toString());
export const appVersion = projectInfo.appVersion;
export const projectName = projectInfo.projectName;
export const serviceName = projectInfo.serviceName;
