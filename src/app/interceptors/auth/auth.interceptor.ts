import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly loader: LoadingService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.returnToken();
    this.loader.show();
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
    return next.handle(authRequest).pipe(
      finalize(() => {
        this.loader.hide();
      })
    );
  }
}
