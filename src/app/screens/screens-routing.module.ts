import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ScreenRootComponent } from './screen-root.component';

const ROUTES: Routes = [
  {
    component: ScreenRootComponent,
    path: '',
    children: [
      { path: '', redirectTo: '/index', pathMatch: 'full' },
      {
        path: 'index',
        title: 'Home',
        loadChildren: () =>
          import('./index/index-screen.module').then((m) => m.IndexScreenModule),
      },
      {
        path: 'login',
        title: 'Authorization',
        loadChildren: () =>
          import('./login/login-screen.module').then((m) => m.LoginScreenModule),
      },
      {
        path: 'billing',
        title: 'Billing',
        loadChildren: () =>
          import('./billing/billing-screen.module').then((m) => m.BillingScreenModule),
      },
      {
        path: 'inventory',
        title: 'Inventory',
        loadChildren: () =>
          import('./inventory/inventory-screen.module').then((m) => m.InventoryScreenModule),
      },
      {
        path: 'profile',
        title: 'Profile',
        loadChildren: () =>
          import('./profile/profile-screen.module').then((m) => m.ProfileScreenModule),
      },
      {
        path: 'reports',
        title: 'Reports',
        loadChildren: () =>
          import('./reports/reports-screen.module').then((m) => m.ReportsScreenModule),
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

/** Модуль маршрутизации экранов */
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ScreensRoutingModule {}
