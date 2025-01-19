import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { defineConfig } from '@mikro-orm/sqlite';
import { AlarmEntity } from './alarms/infrastructure/persistence/sqlite/entities/alarm.entity';

const logger = new Logger('MikroORM');

export default defineConfig({
  entities: [AlarmEntity],
  dbName: 'alarm.db',
  highlighter: new SqlHighlighter(),
  logger: logger.log.bind(logger),
  debug: true,
});
