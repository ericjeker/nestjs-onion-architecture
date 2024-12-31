import { Alarm } from '../../domain/alarm';
import { MarkAlarmAsResolvedCommand } from '../commands/mark-as-resolved.command';
import { MarkAlarmAsResolvedQuery } from '../../domain/queries/mark-as-resolved.query';

export class MarkAsResolvedUseCase {
  constructor(private readonly query: MarkAlarmAsResolvedQuery) {}

  async execute(command: MarkAlarmAsResolvedCommand): Promise<Alarm> {
    return this.query.execute(command.id);
  }
}
