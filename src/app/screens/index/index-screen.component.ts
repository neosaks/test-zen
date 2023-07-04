import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { BaseScreenComponent } from '@shared/components/base-screen/base-screen.component';

@Component({
  selector: 'app-index-screen',
  templateUrl: './index-screen.component.html',
  styleUrls: ['./index-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Компонент домашней страницы */
export class IndexScreenComponent extends BaseScreenComponent implements AfterViewInit {
  /** Заголовок */
  protected readonly title = '@test';

  constructor() {
    super();
  }

  /** @inheritdoc */
  ngAfterViewInit(): void {
    return;
  }
}
