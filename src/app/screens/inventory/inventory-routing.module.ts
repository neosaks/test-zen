import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryScreenComponent } from './inventory-screen.component';

const ROUTES: Routes = [
  {
    path: '',
    component: InventoryScreenComponent,
  },
];

/** Модуль маршрутизации страницы "Инвентарь" */
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
