import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PersistenceDrivers } from './common/application-bootstrap-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.register({ driver: PersistenceDrivers.InMemory }),
    {
      cors: true,
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    },
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
