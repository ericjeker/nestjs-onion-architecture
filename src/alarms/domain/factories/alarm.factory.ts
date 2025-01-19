import { randomUUID } from 'crypto';
import { Alarm } from '../alarm';
import { AlarmSeverity, AlarmSeverityValues } from '../value-objects/severity';
import { AlarmStatus } from '../value-objects/status';

export class AlarmFactory {
  static create(name: string, severity: string) {
    const alarmId = randomUUID();
    const alarmSeverity = new AlarmSeverity(severity as AlarmSeverity['value']);
    const alarmStatus = AlarmStatus.Open;

    if (name === '') {
      throw new Error(
        'Alarm name cannot be empty. Please provide a valid name.',
      );
    }

    if (severity === '') {
      throw new Error(
        'Alarm severity cannot be empty. Please provide a valid severity.',
      );
    }

    if (
      !Object.values(AlarmSeverityValues).includes(
        severity as AlarmSeverityValues,
      )
    ) {
      throw new Error(
        `Alarm severity must be one of the following: ${Object.values(AlarmSeverityValues).join(', ')}`,
      );
    }

    return new Alarm(alarmId, name, alarmSeverity, alarmStatus);
  }
}
