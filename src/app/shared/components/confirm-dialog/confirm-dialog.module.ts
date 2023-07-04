import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})

/** Модуль диалога подтверждения */
export class ConfirmDialogModule {}
