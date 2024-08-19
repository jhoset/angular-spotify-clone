import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
      .then(r => r.AUTH_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.routes')
      .then(r => r.DASHBOARD_ROUTES),
  },
  {
    path: '**', redirectTo: 'auth', pathMatch: 'full'
  }
];
