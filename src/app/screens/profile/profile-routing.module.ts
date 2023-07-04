import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileScreenComponent } from './profile-screen.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ProfileScreenComponent,
  },
];

/** Модуль маршрутизации страницы "Профиль" */
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
