import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ToastService } from 'angular-toastify';

import { catchError, of, throwError } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        (req, next) => {
          //inside function interceptors
          const token = `Bearer 23523252rdafafafasef`;

          console.log(token);

          if (token) {
            //tabhi ham reuqest mein add karnege

            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: token,
              },
            });

            return next(clonedRequest);
          }

          //body of the interceptor
          console.log('AuthInterceptor: Intercepting request');

          return next(req);
        },
        (req, next) => {
          console.log('Second interceptor: Logging request details');
          return next(req).pipe(
            catchError((error) => {
              //error handling logic
              if (error.status === 401) {
                console.log('Unauthorized request - possibly invalid token');
              }
              console.log('Error occurred:', error);

              return throwError(() => error);
            })
          );
        },
      ])
    ),

    ToastService,
  ],
};
