import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsScreenComponent } from './reports-screen.component';

@NgModule({
  declarations: [ReportsScreenComponent],
  exports: [ReportsScreenComponent],
  imports: [ReportsRoutingModule, CommonModule],
})

/** Модуль страницы "Отчёты" */
export class ReportsScreenModule {}
