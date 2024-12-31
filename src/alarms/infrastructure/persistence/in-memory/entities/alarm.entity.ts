import { Alarm } from '../../../../domain/alarm';
import {
  AlarmSeverity,
  AlarmSeverityValues,
} from '../../../../domain/value-objects/alarm-severity';

export class AlarmEntity {
  id: string;
  name: string;
  severity: string;

  /**
   * Constructs a new instance and initializes it using the provided Alarm domain object.
   *
   * @param {Alarm} alarm - The domain object representing the alarm details to initialize the instance with.
   * @return {void} This constructor does not explicitly return a value.
   */
  constructor(alarm: Alarm) {
    this.fromDomain(alarm);
  }

  /**
   * This function is the same as the one in the SQLite AlarmEntity. Potentially
   * we could use a Mapper, but I personally prefer to have a self-contained
   * object that knows how to transfer itself from/to the domain.
   *
   * @return {Alarm} Returns a new object or domain-specific model containing the transformed data.
   */
  toDomain(): Alarm {
    return new Alarm(
      this.id,
      this.name,
      new AlarmSeverity(this.severity as AlarmSeverityValues),
    );
  }

  /**
   * @param {Alarm} alarm - The domain object containing alarm details.
   * @return {void} This method does not return a value.
   */
  fromDomain(alarm: Alarm): void {
    this.id = alarm.id;
    this.name = alarm.name;
    this.severity = alarm.severity.value;
  }
}
