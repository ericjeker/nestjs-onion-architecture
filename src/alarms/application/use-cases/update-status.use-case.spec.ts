import { Test, TestingModule } from '@nestjs/testing';
import { AlarmUpdateStatusUseCase } from './update-status-use.case';
import { AlarmUpdateStatusCommand } from '../commands/update-status.command';
import { UpdateAlarmStatusQuery } from '../../domain/queries/update-status.query';
import { AlarmStatus } from '../../domain/value-objects/status';

describe('AlarmUpdateStatusUseCase', () => {
  let module: TestingModule;
  let useCase: AlarmUpdateStatusUseCase;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        AlarmUpdateStatusUseCase,
        {
          provide: UpdateAlarmStatusQuery,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<AlarmUpdateStatusUseCase>(AlarmUpdateStatusUseCase);
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  describe('execute', () => {
    it('should call the query execute method', async () => {
      const query = module.get<UpdateAlarmStatusQuery>(UpdateAlarmStatusQuery);
      const queryExecuteSpy = jest.spyOn(query, 'execute');

      // Execute the use case
      const command = new AlarmUpdateStatusCommand(
        'mock-id',
        AlarmStatus.Resolved,
      );
      await useCase.execute(command);

      // Assert that the query's execute method was called
      expect(queryExecuteSpy).toHaveBeenCalled();
    });
  });
});
