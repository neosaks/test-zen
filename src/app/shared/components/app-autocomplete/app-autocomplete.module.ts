import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppAutocompleteComponent } from './app-autocomplete.component';

@NgModule({
  declarations: [AppAutocompleteComponent],
  exports: [AppAutocompleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
})

/** Модуль "Автозаполнение" для поля ввода */
export class AppAutocompleteModule {}
