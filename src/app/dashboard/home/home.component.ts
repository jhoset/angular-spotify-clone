import {Component, inject} from '@angular/core';
import {CommonDashboardService} from "../common-dashboard.service";
import {PlaylistItemCardComponent} from "./components/playlist-item-card/playlist-item-card.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PlaylistItemCardComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public commonService = inject(CommonDashboardService);
}
