import { SqlLiteAlarmRepository } from '../repositories/alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { AlarmStatus } from '../../../../domain/value-objects/status';
import { UpdateAlarmStatusQuery } from '../../../../domain/queries/update-status.query';

export class SqliteUpdateAlarmStatusQuery implements UpdateAlarmStatusQuery {
  constructor(private readonly repository: SqlLiteAlarmRepository) {}

  async execute(id: string, status: AlarmStatus): Promise<Alarm> {
    const alarm = await this.repository.findById(id);
    alarm.status = status;
    return this.repository.save(alarm);
  }
}
