import { Injectable } from '@nestjs/common';
import { Alarm } from '../../domain/alarm';
import { AlarmUpdateStatusCommand } from '../commands/update-status.command';
import { UpdateAlarmStatusQuery } from '../../domain/queries/update-status.query';

@Injectable()
export class AlarmUpdateStatusUseCase {
  constructor(private readonly query: UpdateAlarmStatusQuery) {}

  async execute(command: AlarmUpdateStatusCommand): Promise<Alarm> {
    return this.query.execute(command.id, command.status);
  }
}
