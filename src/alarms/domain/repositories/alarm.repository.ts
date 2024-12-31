import { Alarm } from '../alarm';

export abstract class AlarmRepository {
  abstract findAll(): Promise<Alarm[]>;
  abstract findById(id: string): Promise<Alarm>;
  abstract save(alarm: Alarm): Promise<Alarm>;
  abstract delete(id: string): Promise<void>;
}
