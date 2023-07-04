import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseScreenComponent } from '@shared/components/base-screen/base-screen.component';

@Component({
  selector: 'app-billing-screen',
  templateUrl: './billing-screen.component.html',
  styleUrls: ['./billing-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Компонент страницы "Биллинг" */
export class BillingScreenComponent extends BaseScreenComponent {
  /** Заголовок */
  protected readonly title = 'Billing';

  constructor() {
    super();
  }
}
