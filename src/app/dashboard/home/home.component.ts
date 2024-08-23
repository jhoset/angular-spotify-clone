import {Component, inject} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {PlaylistItemCardComponent} from "./components/playlist-item-card/playlist-item-card.component";
import {RouterOutlet} from "@angular/router";
import {GreetingComponent} from "./components/greeting/greeting.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PlaylistItemCardComponent,
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
}
