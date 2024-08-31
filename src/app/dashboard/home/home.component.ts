import {Component, inject} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {PlaylistCardComponent} from "./components/playlist-card/playlist-card.component";
import {RouterOutlet} from "@angular/router";
import {GreetingComponent} from "./components/greeting/greeting.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PlaylistCardComponent,
    RouterOutlet,
    GreetingComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private dashboardService = inject(DashboardService);
  //? SIGNALS
  public topSixPlaylists = this.dashboardService.topSixPlaylists;
  public isLoading = this.dashboardService.isLoading;
}
