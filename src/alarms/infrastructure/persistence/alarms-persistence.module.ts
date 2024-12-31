import { Module } from '@nestjs/common';
import { PersistenceDrivers } from '../../../common/application-bootstrap-options.interface';
import { InMemoryAlarmsPersistenceModule } from './in-memory/in-memory-alarms-persistence.module';
import { SqliteAlarmsPersistenceModule } from './sqlite/sqlite-alarms-persistence.module';

/**
 * This is not particularly necessary as the specific persistence module can be
 * manually imported in the application modules. But in case we have a global
 * driver defined then it makes switching from one persistence driver to
 * another extremely easy.
 */
@Module({})
export class AlarmsPersistenceModule {
  static use(driver: PersistenceDrivers) {
    const persistenceModule =
      driver === PersistenceDrivers.InMemory
        ? InMemoryAlarmsPersistenceModule
        : SqliteAlarmsPersistenceModule;

    return {
      module: AlarmsPersistenceModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
