import { FastifyListenOptions } from 'fastify';
import { NestFactory } from '@nestjs/core';
import {
  Logger,
  LogLevel,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './app.module';
import { PersistenceDrivers } from './common/interfaces/application-bootstrap-options.interface';
import { BadRequestExceptionFilter } from './common/filters/bad-request-exception.filter';

async function bootstrap() {
  const logger: LogLevel[] =
    process.env.NODE_ENV === 'development'
      ? ['error', 'warn', 'log', 'debug']
      : ['error', 'warn', 'log'];

  // CORS
  const corsOptions: CorsOptions = {
    origin: [process.env.CORS_ORIGIN ?? 'http://localhost:4200'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  };

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule.register({ driver: PersistenceDrivers.InMemory }),
    new FastifyAdapter({ logger: false }),
    { logger, cors: corsOptions },
  );

  // Global prefix (/api)
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Versioning (/api/v1)
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Validation and transformation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Register global exception filters
  app.useGlobalFilters(new BadRequestExceptionFilter());

  // Server configuration
  const options: FastifyListenOptions = {
    port: +process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
  };

  await app.listen(options.port, options.host);

  Logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

bootstrap();
