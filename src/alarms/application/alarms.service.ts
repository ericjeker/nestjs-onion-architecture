import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { UpdateAlarmCommand } from './commands/update-alarm.command';
import { AlarmRepository } from '../domain/repositories/alarm.repository';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { Alarm } from '../domain/alarm';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  /**
   * @param createAlarmCommand
   */
  create(createAlarmCommand: CreateAlarmCommand): Promise<Alarm> {
    // We use a Factory here, but we could also simply instantiate a new Alarm()
    const alarm = this.alarmFactory.create(
      createAlarmCommand.name,
      createAlarmCommand.severity,
    );

    return this.alarmRepository.save(alarm);
  }

  /**
   * @return {Promise<Alarm[]>}
   */
  findAll(): Promise<Alarm[]> {
    return this.alarmRepository.findAll();
  }

  /**
   * @param id
   * @return {Promise<Alarm>}
   */
  findOne(id: string): Promise<Alarm> {
    return this.alarmRepository.findById(id);
  }

  update(id: string, updateAlarmCommand: UpdateAlarmCommand): Promise<Alarm> {
    const alarm = this.alarmFactory.create(
      updateAlarmCommand.name,
      updateAlarmCommand.severity,
    );
    alarm.id = id;
    return this.alarmRepository.save(alarm);
  }

  remove(id: string): Promise<void> {
    return this.alarmRepository.delete(id);
  }
}
