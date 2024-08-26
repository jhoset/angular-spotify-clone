import {Component, computed, inject, input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SpotifyPlaylist} from "@core/services/playlists/interfaces";
import {CardPlayButtonComponent} from "@shared/components/card-play-button/card-play-button.component";
import {DashboardService} from "../../../dashboard.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-playlist-item-card',
  standalone: true,
  imports: [
    RouterLink,
    CardPlayButtonComponent,
    NgClass
  ],
  templateUrl: './playlist-item-card.component.html',
  styleUrl: './playlist-item-card.component.scss'
})
export class PlaylistItemCardComponent {
  public dashboardService = inject(DashboardService);
  public currentTrack = this.dashboardService.currentTrack;
  public router = inject(Router);
  public playlist = input.required<SpotifyPlaylist>();
  public isPlayingPlaylist = computed(() => {
    return this.dashboardService.isPlaying() && this.currentTrack()?.playlistId === this.playlist().id;
  })


  public goToPlaylistView(id: string) {
    this.dashboardService.clearPlaylistWithTracks();
    this.dashboardService.setCurrentPlaylist(this.playlist());
    this.router.navigate(["/playlist", id]);
  }
}
