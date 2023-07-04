import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexScreenComponent } from './index-screen.component';

@NgModule({
  declarations: [IndexScreenComponent],
  exports: [IndexScreenComponent],
  imports: [IndexRoutingModule, CommonModule],
})

/** Модуль Index экрана */
export class IndexScreenModule {}
