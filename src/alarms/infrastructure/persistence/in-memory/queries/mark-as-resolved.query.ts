import { Alarm } from 'src/alarms/domain/alarm';
import { MarkAlarmAsResolvedQuery } from '../../../../domain/queries/mark-as-resolved.query';
import { InMemoryAlarmRepository } from '../repositories/alarm.repository';

export class InMemoryMarkAsResolvedQuery implements MarkAlarmAsResolvedQuery {
  constructor(private readonly repository: InMemoryAlarmRepository) {}
  async execute(id: string): Promise<Alarm> {
    const alarm = await this.repository.findById(id);
    // alarm.status = 'resolved';
    return await this.repository.save(alarm);
  }
}
