import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, switchMap, throwError} from "rxjs";
import {AuthRefreshTokenResponse, AuthService} from "@core/services/auth/auth.service";
import {inject} from "@angular/core";
import {Router} from "@angular/router";


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if ((err.status == 401 || err.error.status == 401) && !req.url.includes('/api/auth/refresh_token')) {
          const refresh_token = localStorage.getItem('refresh_token');
          if (!refresh_token) {
            router.navigate(['/auth/login']);
            return throwError(() => err)
          }
          return authService.refreshToken(refresh_token).pipe(
            switchMap((res: AuthRefreshTokenResponse) => {
              localStorage.setItem('token', res.accessToken);
              localStorage.setItem('refresh_token', res.refreshToken || refresh_token);
              return next(req.clone({
                setHeaders: {Authorization: `Bearer ${res.accessToken}`}
              }));
            }),
            catchError((err) => {
              console.error('Error trying to use refresh token')
              if (err.status == '403' || err.status == '401') {
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                router.navigate(['/auth/login']);
              }
              return throwError(() => err);
            })
          )
        } else if (err.status == 401) {
          console.error('Unauthorized', err.status, err.error.message);
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          router.navigate(['/auth/login']);
        } else if (err.status === 500) {
          console.error('Internal Server Error', 'Something went wrong', 500)
        } else {
          console.error('Http Error', `${err.error.error} - ${err.error.message}`);
        }
      }
      //? Re-throw the error
      return throwError(() => err)
    })
  );
};
