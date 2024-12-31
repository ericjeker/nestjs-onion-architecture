import { Alarm } from '../alarm';

export abstract class MarkAlarmAsResolvedQuery {
  abstract execute(id: string): Promise<Alarm>;
}
