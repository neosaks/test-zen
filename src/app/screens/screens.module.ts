import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { NgxMaskModule, IConfig as IMaskConfig } from 'ngx-mask';

// export const maskConfig: Partial<null|IMaskConfig> | (() => Partial<IMaskConfig>) = null;

import { WelcomeModule } from '@shared/components/welcome/welcome.module';

import { ScreensRoutingModule } from './screens-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ScreenRootComponent } from './screen-root.component';

@NgModule({
  declarations: [ScreenRootComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    PortalModule,
    ScreensRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatListModule,
    MatMomentDateModule,
    MatDatepickerModule,

    // @todo
    // Временное решение для исправления ошибки:
    // ERROR NullInjectorError: R3InjectorError(ScreensModule)
    // [InjectionToken mat-autocomplete-scroll-strategy
    MatAutocompleteModule,

    // @todo
    // Временное решение для исправления ошибки:
    // ERROR NullInjectorError: R3InjectorError(ScreensModule)
    // [InjectionToken mat-select-scroll-strategy
    MatSelectModule,

    NgxMaskModule.forRoot(),
    WelcomeModule,
  ]
})
/** Модуль экранов */
export class ScreensModule {}
