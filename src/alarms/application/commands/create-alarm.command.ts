/**
 * Represents a command to create a new alarm with specified attributes.
 * The command serves as a message or data structure conveying intent.
 */
export class CreateAlarmCommand {
  constructor(
    public readonly name: string,
    public readonly severity: string,
  ) {}
}
