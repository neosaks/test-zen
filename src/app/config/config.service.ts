import { Injectable } from '@angular/core';
import { IConfig } from './config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _config?: IConfig;
  private _promise?: Promise<IConfig>;

  /** Возвращает конфигурацию приложения */
  getConfig(): IConfig {
    if (!this._config) {
      throw new Error('Configuration file was not loaded');
    }

    return this._config;
  }

  /** Загружает конфигурацию приложения */
  loadConfig(): Promise<IConfig> {
    const timestamp = Date.now();
    const configUrl = `./assets/config.json?t=${timestamp}`;

    if (this._promise) {
      return this._promise;
    }

    return this._promise = fetch(configUrl)
      .then((response) => response.json())
      .then((config: IConfig) => this._config = config);
  }
}
