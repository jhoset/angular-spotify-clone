import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PlaylistComponent} from "./playlist/playlist.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'playlist/:id',
    component: PlaylistComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
]
