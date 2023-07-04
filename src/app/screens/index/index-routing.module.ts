import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexScreenComponent } from './index-screen.component';

const ROUTES: Routes = [
  {
    path: '',
    component: IndexScreenComponent,
  },
];

/** Модуль маршрутизации домашнего экрана */
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
