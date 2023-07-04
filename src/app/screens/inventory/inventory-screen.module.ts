import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryScreenComponent } from './inventory-screen.component';

@NgModule({
  declarations: [InventoryScreenComponent],
  exports: [InventoryScreenComponent],
  imports: [InventoryRoutingModule, CommonModule],
})

/** Модуль страницы "Инвентарь" */
export class InventoryScreenModule {}
