import { Test, TestingModule } from '@nestjs/testing';
import { AlarmsService } from './alarms.service';
import { AlarmRepository } from '../domain/repositories/alarm.repository';
import { AlarmFactory } from '../domain/factories/alarm.factory';

describe('AlarmsService', () => {
  let service: AlarmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AlarmRepository,
          useValue: {}, // <- Mock
        },
        {
          provide: AlarmFactory,
          useValue: {}, // <- Mock
        },
        AlarmsService, // <- Test
      ],
    }).compile();

    service = module.get<AlarmsService>(AlarmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
