import { Alarm } from '../alarm';
import { AlarmStatus } from '../value-objects/status';

export abstract class UpdateAlarmStatusQuery {
  abstract execute(id: string, status: AlarmStatus): Promise<Alarm>;
}
