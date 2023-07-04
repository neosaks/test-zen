import { HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseRegistry } from '@http/http-registry.class';
import { IHttpOptions } from '@http/interfaces/http-options.interface';
import { BaseScreenComponent } from '@shared/components/base-screen/base-screen.component';
import { Observable } from 'rxjs';

/** Базовый класс компонента "Crud Table" экрана */
@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class CrudTableScreenComponent<T> extends BaseScreenComponent {
  abstract readonly registry: BaseRegistry<T>;

  getEntries(): (options: IHttpOptions) => Observable<HttpResponse<T[]>> {
    return (options: IHttpOptions) => {
      return this.registry.getEntries(options);
    }
  }

  getEntry(): (id: number) => Observable<T> {
    return (id: number) => {
      return this.registry.getEntry(id);
    }
  }

  updateEntry(): (booking: T) => Observable<T> {
    return (booking: T) => {
      return this.registry.updateEntry(booking);
    }
  }

  deleteEntry(): (booking: T) => Observable<void> {
    return (booking: T) => {
      return this.registry.deleteEntry(booking);
    }
  }
}
