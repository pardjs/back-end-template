import { NestFactory } from '@nestjs/core';
import { logger } from '@pardjs/common';
import { start } from 'elastic-apm-node';

import { APM_SERVICE_URL, PORT, SERVICE_NAME } from './config';

start({
  serviceName: SERVICE_NAME,
  serverUrl: APM_SERVICE_URL
});

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap()
  .then(() => {
    logger.info(`bootstrap successfully, service ${SERVICE_NAME} is listening on port ${PORT} `);
  })
  .catch(err => {
    logger.error('bootstrap error', { err });
  });
