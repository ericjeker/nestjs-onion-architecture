import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    if (options.driver === 'sqlite') {
      // We initialize MikroORM only if the selected driver requires it.
      MikroOrmModule.forRoot();
    }

    return {
      module: CoreModule,
    };
  }
}
