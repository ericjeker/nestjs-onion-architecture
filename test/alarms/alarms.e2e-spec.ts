import { Test, TestingModule } from '@nestjs/testing';
import { AlarmsModule } from '../../src/alarms/application/alarms.module';
import { AlarmsPersistenceModule } from '../../src/alarms/infrastructure/persistence/alarms-persistence.module';
import { PersistenceDrivers } from '../../src/common/interfaces/application-bootstrap-options.interface';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AlarmRepository } from '../../src/alarms/domain/repositories/alarm.repository';
import { AlarmSeverityValues } from '../../src/alarms/domain/value-objects/severity';
import { AlarmFactory } from '../../src/alarms/domain/factories/alarm.factory';

describe('Alarms', () => {
  let app: NestFastifyApplication;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        // For testing, we use the InMemory repository... how easy is that...
        AlarmsModule.withInfrastucture([
          AlarmsPersistenceModule.use(PersistenceDrivers.InMemory),
        ]),
      ],
    }).compile();

    // Application initialization
    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter({ logger: false }),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    // TODO: Database initialization here
  });

  it('should staturp the application properly', () => {
    expect(app).toBeDefined();
  });

  describe('GET /alarms/:id', () => {
    it('should return the alarm with the specified id', async () => {
      const alarm = AlarmFactory.create(
        'Alarm Name',
        AlarmSeverityValues.Critical,
      );

      // Here we receive the implementation (InMemory)
      const repository = moduleRef.get(AlarmRepository);
      await repository.save(alarm);

      const response = await app.inject({
        method: 'GET',
        url: `/alarms/${alarm.id}`,
      });
      expect(response.statusCode).toStrictEqual(200);
      expect(response.headers['content-type']).toStrictEqual(
        'application/json; charset=utf-8',
      );
    });

    it('should return 404 if the alarm does not exist', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/alarms/1234567890',
      });

      expect(response.statusCode).toStrictEqual(404);
      expect(response.headers['content-type']).toStrictEqual(
        'application/json; charset=utf-8',
      );
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
