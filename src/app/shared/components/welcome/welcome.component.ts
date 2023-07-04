import { Component } from '@angular/core';

/** Компонент текста приветствия */
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  getText(): string {
    const hours = new Date().getHours();

    if (hours >= 0 && hours < 6) {
      return 'Доброй ночи';
    }

    if (hours >= 6 && hours < 12) {
      return 'Доброе утро';
    }

    if (hours >= 12 && hours < 18) {
      return 'Добрый день';
    }

    if (hours >= 18 && hours <= 24) {
      return 'Добрый вечер';
    }

    return 'Добро пожаловать';
  }
}
