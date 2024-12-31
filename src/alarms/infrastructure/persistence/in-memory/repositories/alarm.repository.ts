import { AlarmRepository } from '../../../../domain/repositories/alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';

export class InMemoryAlarmRepository implements AlarmRepository {
  /**
   * Potentially, we could store the Alarm domain object directly, but it is not
   * necessarily serializable. The AlarmEntity is made to be serializable.
   */
  private readonly alarms = new Map<string, AlarmEntity>();

  async findAll(): Promise<Alarm[]> {
    return Array.from(this.alarms.values()).map((entity) => entity.toDomain());
  }

  async findById(id: string): Promise<Alarm> {
    return this.alarms.get(id).toDomain();
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const entity = new AlarmEntity(alarm);
    this.alarms.set(alarm.id, entity);
    return alarm;
  }

  async delete(id: string): Promise<void> {
    this.alarms.delete(id);
  }
}
