import { Module } from '@nestjs/common';
import { AlarmRepository } from '../../../domain/repositories/alarm.repository';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';
import { MarkAlarmAsResolvedQuery } from '../../../domain/queries/mark-as-resolved.query';
import { InMemoryMarkAsResolvedQuery } from './queries/mark-as-resolved.query';

@Module({
  imports: [],
  providers: [
    // This binds the AlarmRepository port to an adapter.
    {
      provide: AlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
    {
      provide: MarkAlarmAsResolvedQuery,
      useClass: InMemoryMarkAsResolvedQuery,
    },
  ],
  exports: [AlarmRepository, MarkAlarmAsResolvedQuery],
})
export class InMemoryAlarmsPersistenceModule {}
