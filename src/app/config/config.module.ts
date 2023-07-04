import { NgModule, APP_INITIALIZER } from '@angular/core';

import { ConfigService } from './config.service';
import { initializerFn } from './initializer-fn';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializerFn,
      multi: true,
      deps: [ConfigService],
    },
  ],
})
export class ConfigModule {}
