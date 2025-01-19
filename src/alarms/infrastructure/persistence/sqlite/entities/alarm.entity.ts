import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { Alarm } from '../../../../domain/alarm';
import {
  AlarmSeverity,
  AlarmSeverityValues,
} from '../../../../domain/value-objects/severity';
import { AlarmStatus } from '../../../../domain/value-objects/status';

@Entity()
export class AlarmEntity {
  @PrimaryKey()
  id: string = randomUUID();

  @Property()
  name: string;

  @Property()
  severity: AlarmSeverityValues;

  @Property()
  status: AlarmStatus;

  constructor(alarm: Alarm) {
    this.fromDomain(alarm);
  }

  /**
   * Transforms the current object or data structure into a domain-specific representation.
   * This method typically maps data from an external format or DTO (Data Transfer Object) to a domain model.
   *
   * Note: could also use a static AlarmMapper class with AlarmMapper.toPersistence, AlarmMapper.toDomain
   *
   * @return {Alarm} Returns a new object or domain-specific model containing the transformed data.
   */
  toDomain(): Alarm {
    return new Alarm(
      this.id,
      this.name,
      new AlarmSeverity(this.severity),
      this.status,
    );
  }

  /**
   * Populates the properties of the current object from a given Alarm domain object.
   *
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
