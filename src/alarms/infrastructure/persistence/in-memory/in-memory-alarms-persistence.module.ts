import { Module } from '@nestjs/common';
import { AlarmRepository } from '../../../domain/repositories/alarm.repository';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';

@Module({
  imports: [],
  providers: [
    // This binds the AlarmRepository port to an adapter.
    {
      provide: AlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class InMemoryAlarmsPersistenceModule {}
