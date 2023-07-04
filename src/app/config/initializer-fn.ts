// import { Observable } from 'rxjs';
import { IConfig } from './config.interface';
import { ConfigService } from './config.service';

export const initializerFn = (
  config: ConfigService
) => (): Promise<IConfig> => config.loadConfig();
