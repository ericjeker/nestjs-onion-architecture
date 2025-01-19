import { Alarm } from '../../../../domain/alarm';
import {
  AlarmSeverity,
  AlarmSeverityValues,
} from '../../../../domain/value-objects/severity';
import { AlarmStatus } from '../../../../domain/value-objects/status';

/**
 * We don't use MikroORM here, but we could totally use it instead of creating
 * another AlarmEntity. MikroORM entities are independent of the persistence
 * infrastructure used (:in-memory:, SQLite, MySQL, etc...)
 */
export class AlarmEntity {
  id: string;
  name: string;
  severity: string;
  status: string;

  /**
   * Constructs a new instance and initializes it using the provided Alarm domain object.
   *
   * @param {Alarm} alarm - The domain object representing the alarm details to initialize the instance with.
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
      this.status as AlarmStatus,
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
    this.status = alarm.status;
  }
}
