import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HTTPLoaderService } from '../services/http-loader.service';

export function httpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const httpLoaderService = inject(HTTPLoaderService);
  httpLoaderService.isLoading.set(true);

  const reqWithHeader = req.clone({
    headers: req.headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token')
    ),
  });

  return next(reqWithHeader).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event.type === HttpEventType.Response) {
        httpLoaderService.isLoading.set(false);
      }
    })
  );
}
