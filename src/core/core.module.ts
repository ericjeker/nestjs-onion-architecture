import { Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '../common/application-bootstrap-options.interface';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    if (options.driver === 'sqlite') {
      MikroOrmModule.forRoot();
    }

    return {
      module: CoreModule,
    };
  }
}
