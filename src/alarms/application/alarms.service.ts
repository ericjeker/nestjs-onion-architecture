import { Injectable } from '@nestjs/common';
import { AlarmRepository } from '../domain/repositories/alarm.repository';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { Alarm } from '../domain/alarm';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { FindAllAlarmsCommand } from './commands/find-all-alarms.command';
import { UpdateAlarmCommand } from './commands/update-alarm.command';

/**
 * This is a CRUD service. Basically, we don't want to have more than CRUD
 * function in here. The rest should be stored in use cases. Use cases can
 * be fund in `./use-cases/*`
 */
@Injectable()
export class AlarmsService {
  constructor(private readonly alarmRepository: AlarmRepository) {}

  /**
   * @param {CreateAlarmCommand} createAlarmCommand
   */
  create(createAlarmCommand: CreateAlarmCommand): Promise<Alarm> {
    // We use a Factory here, but we could also simply instantiate a new Alarm()
    const alarm = AlarmFactory.create(
      createAlarmCommand.name,
      createAlarmCommand.severity,
    );

    return this.alarmRepository.save(alarm);
  }

  /**
   * @param {FindAllAlarmsCommand} findAllAlarmsCommand
   * @return {Promise<Alarm[]>}
   */
  findAll(findAllAlarmsCommand: FindAllAlarmsCommand): Promise<Alarm[]> {
    return this.alarmRepository.findAll();
  }

  /**
   * @param id
   * @return {Promise<Alarm>}
   */
  findOne(id: string): Promise<Alarm> {
    return this.alarmRepository.findById(id);
  }

  update(updateAlarmCommand: UpdateAlarmCommand): Promise<Alarm> {
    const alarm = AlarmFactory.create(
      updateAlarmCommand.name,
      updateAlarmCommand.severity,
    );
    alarm.id = updateAlarmCommand.id;
    return this.alarmRepository.save(alarm);
  }

  remove(id: string): Promise<void> {
    return this.alarmRepository.delete(id);
  }
}
