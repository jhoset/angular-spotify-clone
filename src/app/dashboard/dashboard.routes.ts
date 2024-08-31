import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PlaylistComponent} from "./playlist/playlist.component";
import {DashboardComponent} from "./dashboard.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
      },
      {
        path: 'playlist/:id',
        component: PlaylistComponent,
        title: 'Playlist'
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  },
]
