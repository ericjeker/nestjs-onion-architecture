import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AlarmRepository } from '../../../../domain/repositories/alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { EntityRepository } from '@mikro-orm/sqlite';

@Injectable()
export class SqlLiteAlarmRepository implements AlarmRepository {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepository: EntityRepository<AlarmEntity>,
  ) {}

  async findAll(): Promise<Alarm[]> {
    const entities = await this.alarmRepository.findAll();
    return entities.map((entity: AlarmEntity) => entity.toDomain());
  }

  async findById(id: string): Promise<Alarm> {
    const entity = await this.alarmRepository.findOne({ id });
    return entity.toDomain();
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const entity = new AlarmEntity(alarm);
    await this.alarmRepository.getEntityManager().persistAndFlush(entity);
    return entity.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.alarmRepository.nativeDelete({ id });
  }
}
