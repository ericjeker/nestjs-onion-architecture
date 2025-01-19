import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { AlarmRepository } from '../../../domain/repositories/alarm.repository';
import { UpdateAlarmStatusQuery } from '../../../domain/queries/update-status.query';
import { SqliteUpdateAlarmStatusQuery } from './queries/update-status.query';
import { AlarmEntity } from './entities/alarm.entity';

@Module({
  imports: [MikroOrmModule.forFeature([AlarmEntity])],
  providers: [
    // This binds the AlarmRepository port to an adapter (MikroORM).
    {
      provide: AlarmRepository,
      useClass: EntityRepository<AlarmEntity>,
    },
    {
      provide: UpdateAlarmStatusQuery,
      useClass: SqliteUpdateAlarmStatusQuery,
    },
  ],
  // This export the implementation (Sqlite...)
  exports: [AlarmRepository, UpdateAlarmStatusQuery],
})
export class SqliteAlarmsPersistenceModule {}
