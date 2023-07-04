import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiInterceptor } from './interceptors/api/api.interceptor';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { MessagesInterceptor } from './interceptors/messages/messages.interceptor';
import { RequestsInterceptor } from './interceptors/requests/requests.interceptor';

@NgModule({
  imports: [MatSnackBarModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MessagesInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    },
  ]
})
export class HttpModule {}
