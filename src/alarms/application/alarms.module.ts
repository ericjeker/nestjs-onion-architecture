import { DynamicModule, Module, Type } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '../../common/interfaces/application-bootstrap-options.interface';
import { AlarmsController } from '../presenter/http/alarms.controller';
import { AlarmsPersistenceModule } from '../infrastructure/persistence/alarms-persistence.module';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { AlarmsService } from './alarms.service';
import { MarkAsResolvedUseCase } from './use-cases/mark-as-resolved.use-case';

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
      providers: [AlarmsService, AlarmFactory, MarkAsResolvedUseCase],
    };
  }

  /**
   * TODO: What about this? 🤔
   * @param options
   */
  static forRoot(options: ApplicationBootstrapOptions) {
    return {
      module: AlarmsModule,
      imports: [AlarmsPersistenceModule.use(options.driver)],
      controllers: [AlarmsController],
      providers: [AlarmsService, AlarmFactory, MarkAsResolvedUseCase],
    };
  }
}
