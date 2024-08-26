import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, from, lastValueFrom, switchMap, throwError} from "rxjs";
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
        if (err.status == 401 || err.error.status == 401 ) {
          console.log('401', err.error.message)
          const refresh_token = localStorage.getItem('refresh_token');
          console.log('trying refresh', refresh_token);
          if (refresh_token) {
            console.log('ENTRO AQUI', refresh_token)
            authService.refreshToken(refresh_token).subscribe((res: AuthRefreshTokenResponse) => {
                console.warn('>>> Refresh response')
                localStorage.setItem('token', res.accessToken);
                localStorage.setItem('refresh_token', res.refreshToken || refresh_token);
                const clonedReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.accessToken}`
                  }
                });
                console.log('>>> Token Refreshed!');
                return next(clonedReq);
              },
              catchError((error) => {
                console.log('error refreshing')
                if (error.status == 403) {
                  console.log('An error occurred trying to refresh token');
                  localStorage.removeItem('token');
                  localStorage.removeItem('refresh_token');
                  router.navigate(['/auth/login']);
                }
                return throwError(() => error);
              })
            )
          } else {
            router.navigate(['/auth/login']);
          }
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

