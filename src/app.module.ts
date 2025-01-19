import { DynamicModule, Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AlarmsModule } from './alarms/application/alarms.module';
import { AlarmsPersistenceModule } from './alarms/infrastructure/persistence/alarms-persistence.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { HealthModule } from './health/application/health.module';

@Module({})
export class AppModule {
  /**
   * Registers and configures application modules based on the provided options.
   *
   * @param {ApplicationBootstrapOptions} options - The configuration options used to bootstrap the application.
   * @return {Object} The configuration object including the application module and its imports.
   */
  static register(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        HealthModule,

        /**
         * In a layered architecture, we would probably call this method
         * "forRoot", but because we want to start our application (AlarmModule
         * is in our application layer) with potentially a different
         * configuration of the infrastructure layer we call this
         * "withInfrastructure".
         */
        AlarmsModule.withInfrastucture([
          AlarmsPersistenceModule.use(options.driver),
        ]),
      ],
    };
  }
}
