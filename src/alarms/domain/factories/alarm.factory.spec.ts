import { AlarmFactory } from './alarm.factory';
import { AlarmSeverity, AlarmSeverityValues } from '../value-objects/severity';

describe('AlarmFactory', () => {
  describe('create', () => {
    it('should create an alarm object with correct properties', () => {
      // Arrange: Define the input and expected output
      const input = { name: 'fire', severity: 'high' };
      const expectedAlarm = {
        id: expect.any(String),
        name: 'fire',
        severity: new AlarmSeverity(AlarmSeverityValues.High),
      };

      // Act: Call the create method
      const result = AlarmFactory.create(input.name, input.severity);

      // Assert: Verify the returned object matches expectations
      expect(result).toEqual(expect.objectContaining(expectedAlarm));
    });

    it('should throw an error if name is empty', () => {
      // Arrange: Define an invalid input
      const invalidInput = { name: '', severity: 'unknown' };

      // Act & Assert: Verify it throws an error
      expect(() =>
        AlarmFactory.create(invalidInput.name, invalidInput.severity),
      ).toThrow('Alarm name cannot be empty. Please provide a valid name.');
    });

    it('should throw an error if severity is invalid', () => {
      // Arrange: Define the invalid input
      const invalidInput = { name: 'fire', severity: 'invalid-severity' };

      // Act & Assert: Verify it throws an error
      expect(() =>
        AlarmFactory.create(invalidInput.name, invalidInput.severity),
      ).toThrow(
        `Alarm severity must be one of the following: ${Object.values(AlarmSeverityValues).join(', ')}`,
      );
    });
  });
});
