/**
 * Represents a command to update an existing alarm with specified attributes.
 * The command serves as a message or data structure conveying intent.
 */
export class UpdateAlarmCommand {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly severity: string,
  ) {}
}
