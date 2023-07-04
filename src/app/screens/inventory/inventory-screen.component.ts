import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseScreenComponent } from '@shared/components/base-screen/base-screen.component';

@Component({
  selector: 'app-inventory-screen',
  templateUrl: './inventory-screen.component.html',
  styleUrls: ['./inventory-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Компонент страницы "Инвентарь" */
export class InventoryScreenComponent extends BaseScreenComponent {
  /** Заголовок */
  protected readonly title = 'Inventory';

  constructor() {
    super();
  }
}
