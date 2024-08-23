import {Component, inject, input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SpotifyPlaylist} from "@core/services/playlists/interfaces";
import {CardPlayButtonComponent} from "@shared/components/card-play-button/card-play-button.component";
import {DashboardService} from "../../../dashboard.service";

@Component({
  selector: 'app-playlist-item-card',
  standalone: true,
  imports: [
    RouterLink,
    CardPlayButtonComponent
  ],
  templateUrl: './playlist-item-card.component.html',
  styleUrl: './playlist-item-card.component.scss'
})
export class PlaylistItemCardComponent {
  public dashboardService = inject(DashboardService);
  public router = inject(Router);
  public playlist = input.required<SpotifyPlaylist>();


  public goToPlaylistView(id: string) {
    this.dashboardService.setCurrentPlaylist(this.playlist());
    this.router.navigate(["/playlist", id])
  }
}
