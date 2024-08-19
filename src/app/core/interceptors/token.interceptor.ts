import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const spotifyApiUrl = 'https://api.spotify.com/v1';

  if (token && req.url.startsWith(spotifyApiUrl)) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    });
    console.log(JSON.parse(token))
    return next(clonedReq);
  }

  return next(req);
};
