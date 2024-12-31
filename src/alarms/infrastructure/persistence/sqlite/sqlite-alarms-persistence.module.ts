import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AlarmEntity } from './entities/alarm.entity';
import { AlarmRepository } from '../../../domain/repositories/alarm.repository';
import { EntityRepository } from '@mikro-orm/sqlite';
import { MarkAlarmAsResolvedQuery } from '../../../domain/queries/mark-as-resolved.query';
import { SqliteMarkAsResolvedQuery } from './queries/mark-as-resolved.query';

@Module({
  imports: [MikroOrmModule.forFeature([AlarmEntity])],
  providers: [
    // This binds the AlarmRepository port to an adapter.
    {
      provide: AlarmRepository,
      useClass: EntityRepository<AlarmEntity>,
    },
    {
      provide: MarkAlarmAsResolvedQuery,
      useClass: SqliteMarkAsResolvedQuery,
    },
  ],
  exports: [AlarmRepository, MarkAlarmAsResolvedQuery],
})
export class SqliteAlarmsPersistenceModule {}
