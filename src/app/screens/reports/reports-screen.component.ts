import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseScreenComponent } from '@shared/components/base-screen/base-screen.component';

@Component({
  selector: 'app-reports-screen',
  templateUrl: './reports-screen.component.html',
  styleUrls: ['./reports-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Компонент страницы "Отчёты" */
export class ReportsScreenComponent extends BaseScreenComponent {
  /** Заголовок */
  protected readonly title = 'Reports';

  constructor() {
    super();
  }
}
