import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingScreenComponent } from './billing-screen.component';

@NgModule({
  declarations: [BillingScreenComponent],
  exports: [BillingScreenComponent],
  imports: [BillingRoutingModule, CommonModule],
})

/** Модуль страницы "Биллинг" */
export class BillingScreenModule {}
