import {Component, computed, inject, input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SpotifyPlaylist} from "@core/services/playlists/interfaces";
import {CardPlayButtonComponent} from "../card-play-button/card-play-button.component";
import {DashboardService} from "../../../dashboard.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [
    RouterLink,
    CardPlayButtonComponent,
    NgClass
  ],
  templateUrl: './playlist-card.component.html',
})
export class PlaylistCardComponent {
  public dashboardService = inject(DashboardService);
  public router = inject(Router);

  public playlist = input.required<SpotifyPlaylist>();
  public isPlaying = this.dashboardService.isPlaying;
  public currentTrack = this.dashboardService.currentTrack;

  public isPlayingPlaylist = computed(() => {
    return this.isPlaying() && this.currentTrack()?.playlistId === this.playlist().id;
  })


  public goToPlaylistView(id: string) {
    this.dashboardService.setPlaylistSelected(this.playlist());
    this.router.navigate(["/playlist", id]);
  }
}
