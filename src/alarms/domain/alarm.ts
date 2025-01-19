import { AlarmSeverity } from './value-objects/severity';
import { AlarmStatus } from './value-objects/status';

export class Alarm {
  constructor(
    public id: string,
    public name: string,
    public severity: AlarmSeverity,
    public status: AlarmStatus,
  ) {}
}
