import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('token') && localStorage.getItem('refresh_token')) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
