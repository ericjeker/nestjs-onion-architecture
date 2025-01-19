import { Module } from '@nestjs/common';
import { AlarmRepository } from '../../../domain/repositories/alarm.repository';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';
import { InMemoryUpdateAlarmStatusQuery } from './queries/update-status.query';
import { UpdateAlarmStatusQuery } from '../../../domain/queries/update-status.query';

@Module({
  imports: [],
  providers: [
    // This binds the AlarmRepository port to an adapter.
    {
      provide: AlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
    {
      provide: UpdateAlarmStatusQuery,
      useClass: InMemoryUpdateAlarmStatusQuery,
    },
  ],
  // This export the implementation (InMemory...)
  exports: [AlarmRepository, UpdateAlarmStatusQuery],
})
export class InMemoryAlarmsPersistenceModule {}
