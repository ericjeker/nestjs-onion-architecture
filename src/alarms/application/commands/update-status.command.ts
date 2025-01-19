import { AlarmStatus } from '../../domain/value-objects/status';

export class AlarmUpdateStatusCommand {
  constructor(
    public readonly id: string,
    public readonly status: AlarmStatus,
  ) {}
}
