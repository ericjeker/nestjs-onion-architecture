import { Alarm } from 'src/alarms/domain/alarm';
import { InMemoryAlarmRepository } from '../repositories/alarm.repository';
import { AlarmStatus } from '../../../../domain/value-objects/status';
import { UpdateAlarmStatusQuery } from '../../../../domain/queries/update-status.query';

export class InMemoryUpdateAlarmStatusQuery implements UpdateAlarmStatusQuery {
  constructor(private readonly repository: InMemoryAlarmRepository) {}

  async execute(id: string, status: AlarmStatus): Promise<Alarm> {
    const alarm = await this.repository.findById(id);
    alarm.status = status;
    return this.repository.save(alarm);
  }
}
