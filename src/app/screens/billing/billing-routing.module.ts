import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingScreenComponent } from './billing-screen.component';

const ROUTES: Routes = [
  {
    path: '',
    component: BillingScreenComponent,
  },
];

/** Модуль маршрутизации страницы "Биллинг" */
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class BillingRoutingModule {}
