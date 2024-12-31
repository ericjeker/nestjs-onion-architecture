export enum AlarmSeverityValues {
  Critical = 'critical',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export class AlarmSeverity {
  constructor(readonly value: AlarmSeverityValues) {}

  equals(severity: AlarmSeverity) {
    return this.value === severity.value;
  }
}
