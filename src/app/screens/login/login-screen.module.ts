import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { WelcomeModule } from '@shared/components/welcome/welcome.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginScreenComponent } from './login-screen.component';

@NgModule({
  declarations: [LoginScreenComponent],
  exports: [LoginScreenComponent],
  imports: [
    LoginRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    WelcomeModule,
  ],
})
/** Модуль экрана авторизации */
export class LoginScreenModule {}
