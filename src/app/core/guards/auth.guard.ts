import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  console.log('Auth Guard')
  if (!localStorage.getItem('token')) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
