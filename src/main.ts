import { NestFactory } from '@nestjs/core';
import { logger } from '@pardjs/common';
import { config as configEnv } from 'dotenv';
import { start } from 'elastic-apm-node';

// read env config from .env file
configEnv();

start({
  serviceName: process.env.APM_SERVICE_NAME,
  serverUrl: process.env.APM_SERVICE_URL
});

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap()
  .then(() => {
    logger.info('bootstrap successfully');
  })
  .catch(err => {
    logger.error('bootstrap error', { err });
  });
