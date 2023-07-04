import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login-screen.component';

const ROUTES: Routes = [
  {
    path: '',
    component: LoginScreenComponent,
  },
];

/** Модуль маршрутизации домашнего экрана */
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
