import { MarkAlarmAsResolvedQuery } from '../../../../domain/queries/mark-as-resolved.query';
import { SqlLiteAlarmRepository } from '../repositories/alarm.repository';
import { Alarm } from '../../../../domain/alarm';

export class SqliteMarkAsResolvedQuery implements MarkAlarmAsResolvedQuery {
  constructor(private readonly repository: SqlLiteAlarmRepository) {}
  async execute(id: string): Promise<Alarm> {
    const alarm = await this.repository.findById(id);
    // alarm.status = 'resolved';
    return await this.repository.save(alarm);
  }
}
