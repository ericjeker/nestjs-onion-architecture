import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AlarmsModule } from './alarms/application/alarms.module';
import { AlarmsPersistenceModule } from './alarms/infrastructure/persistence/alarms-persistence.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        /**
         * TODO: Why not simply doing AlarmsModule.forRoot(options)? Using "withInfrastructure" sounds like a lot of different names for the same things
         */
        AlarmsModule.withInfrastucture(
          AlarmsPersistenceModule.use(options.driver),
        ),
      ],
    };
  }
}
