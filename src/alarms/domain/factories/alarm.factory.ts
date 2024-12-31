import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Alarm } from '../alarm';
import {
  AlarmSeverity,
  AlarmSeverityValues,
} from '../value-objects/alarm-severity';

@Injectable()
export class AlarmFactory {
  static create(name: string, severity: string) {
    const alarmId = randomUUID();
    const alarmSeverity = new AlarmSeverity(severity as AlarmSeverity['value']);

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

    return new Alarm(alarmId, name, alarmSeverity);
  }
}
