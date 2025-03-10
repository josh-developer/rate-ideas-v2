import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export function httpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const reqWithHeader = req.clone({
    headers: req.headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token')
    ),
  });

  return next(reqWithHeader).pipe(tap(event => {}));
}
