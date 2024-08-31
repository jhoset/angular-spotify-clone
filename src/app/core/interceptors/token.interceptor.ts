import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from "../../../environments/environment.development";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token && req.url.startsWith(environment.SPOTIFY_API_URL)) {
    const clonedReq = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });
    return next(clonedReq);
  }
  return next(req);
};
