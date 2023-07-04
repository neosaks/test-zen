import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsScreenComponent } from './reports-screen.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ReportsScreenComponent,
  },
];

/** Модуль маршрутизации страницы "Отчёты" */
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
