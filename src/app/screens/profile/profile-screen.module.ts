import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgxMaskModule } from 'ngx-mask';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileScreenComponent } from './profile-screen.component';

@NgModule({
  declarations: [ProfileScreenComponent],
  exports: [ProfileScreenComponent],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
  ],
})

/** Модуль страницы "Профиль" */
export class ProfileScreenModule {}
