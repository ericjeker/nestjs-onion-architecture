import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsController } from '../presenter/http/alarms.controller';
import { AlarmsService } from './alarms.service';
import { AlarmUpdateStatusUseCase } from './use-cases/update-status-use.case';

@Module({})
export class AlarmsModule {
  /**
   * Configures the AlarmsModule with the specified Infrastructure modules.
   *
   * @param {Type[] | DynamicModule[]} infrastuctureModule - An array of modules or dynamic modules to be imported into the AlarmsModule.
   * @return {object} A module configuration object for the AlarmsModule.
   */
  static withInfrastucture(
    infrastuctureModule: Type[] | DynamicModule[],
  ): DynamicModule {
    return {
      module: AlarmsModule,
      imports: [...infrastuctureModule],
      controllers: [AlarmsController],
      providers: [AlarmsService, AlarmUpdateStatusUseCase],
    };
  }
}
