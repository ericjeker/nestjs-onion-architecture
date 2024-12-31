import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from '../presenter/http/alarms.controller';
import { ApplicationBootstrapOptions } from '../../common/application-bootstrap-options.interface';
import { AlarmsPersistenceModule } from '../infrastructure/persistence/alarms-persistence.module';
import { AlarmFactory } from '../domain/factories/alarm.factory';

@Module({})
export class AlarmsModule {
  /**
   * TODO: not sure what this is for? should it be persistence instead of infrastructure?
   * @param infrastuctureModule
   */
  static withInfrastucture(infrastuctureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastuctureModule],
      controllers: [AlarmsController],
      providers: [AlarmsService, AlarmFactory],
    };
  }

  /**
   * TODO: What about this?
   * @param options
   */
  static forRoot(options: ApplicationBootstrapOptions) {
    return {
      module: AlarmsModule,
      imports: [AlarmsPersistenceModule.use(options.driver)],
      controllers: [AlarmsController],
      providers: [AlarmsService, AlarmFactory],
    };
  }
}
