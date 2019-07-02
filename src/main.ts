import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { corsOptions, HttpExceptionFilter, logger, ValidationPipe } from '@pardjs/common';
import cookieParser from 'cookie-parser';
import { start } from 'elastic-apm-node';

import {
  APM_SERVICE_URL,
  appVersion,
  PORT,
  projectName,
  SERVICE_BASE,
  serviceName
} from './config';

start({
  serviceName: serviceName,
  serverUrl: APM_SERVICE_URL
});

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  const options = new DocumentBuilder()
    .setTitle(projectName)
    .setDescription(serviceName)
    .setVersion(appVersion)
    .setBasePath(SERVICE_BASE + '/api')
    .addBearerAuth()
    .setSchemes('http', 'https')
    .build();
  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SERVICE_BASE + (SERVICE_BASE ? '-' : '/') + 'api-doc', app, doc);
  await app.listen(PORT);
}
bootstrap()
  .then(() => {
    logger.info(`bootstrap successfully, service ${serviceName} is listening on port ${PORT} `);
  })
  .catch(err => {
    logger.error('bootstrap error', { err });
  });
