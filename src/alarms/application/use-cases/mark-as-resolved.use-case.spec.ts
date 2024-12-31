import { Test, TestingModule } from '@nestjs/testing';
import { MarkAsResolvedUseCase } from './mark-as-resolved.use-case';
import { MarkAlarmAsResolvedQuery } from '../../domain/queries/mark-as-resolved.query';
import { MarkAlarmAsResolvedCommand } from '../commands/mark-as-resolved.command';

describe('MarkAsResolvedUseCase', () => {
  let module: TestingModule;
  let useCase: MarkAsResolvedUseCase;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        MarkAsResolvedUseCase,
        {
          provide: MarkAlarmAsResolvedQuery,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<MarkAsResolvedUseCase>(MarkAsResolvedUseCase);
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  describe('execute', () => {
    it('should call the query execute method', async () => {
      const query = module.get<MarkAlarmAsResolvedQuery>(
        MarkAlarmAsResolvedQuery,
      );
      const queryExecuteSpy = jest.spyOn(query, 'execute');

      // Execute the use case
      const command = new MarkAlarmAsResolvedCommand('mock-id');
      // TODO: not sure why this fail for now...
      await useCase.execute(command);

      // Assert that the query's execute method was called
      expect(queryExecuteSpy).toHaveBeenCalled();
    });
  });
});
