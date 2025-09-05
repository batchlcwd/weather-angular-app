// ng generate interceptor auth

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = `Bearer 23523252rdafafafasef`;

    console.log(token);

    if (token) {
      //tabhi ham reuqest mein add karnege

      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: token,
        },
      });

      return next.handle(clonedRequest);
    }

    //body of the interceptor
    console.log('AuthInterceptor: Intercepting request');

    return next.handle(req);
  }
}
