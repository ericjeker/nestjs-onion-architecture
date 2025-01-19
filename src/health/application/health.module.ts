import { Module } from '@nestjs/common';
import { HealthController } from '../presenter/http/health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
