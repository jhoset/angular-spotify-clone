import {Routes} from '@angular/router';
import {authGuard} from "@core/guards/auth.guard";
import {loginGuard} from "@core/guards/login.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
      .then(r => r.AUTH_ROUTES),
    canActivate: [loginGuard]
  },
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.routes')
      .then(r => r.DASHBOARD_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '**', redirectTo: 'auth', pathMatch: 'full'
  }
];
