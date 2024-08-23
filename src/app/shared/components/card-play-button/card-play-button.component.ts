import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {DashboardService, PlaylistTrack} from "../../../dashboard/dashboard.service";
import {PlaylistsService} from "@core/services/playlists/playlists.service";
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";
import {map, tap} from "rxjs";
import {SpotifyPlaylistItem, SpotifyPlaylistTrackResponse} from "@core/services/playlists/interfaces";

@Component({
  selector: 'app-card-play-button',
  standalone: true,
  imports: [
    SvgIconComponent
  ],
  templateUrl: './card-play-button.component.html',
  styleUrl: './card-play-button.component.scss'
})
export class CardPlayButtonComponent {
  public dashboardService = inject(DashboardService);
  private playlistsService = inject(PlaylistsService);
  //? SIGNALS
  public playlistId = input.required<string>();
  public currentTrack = this.dashboardService.currentTrack;
  public playlistTracks = signal<PlaylistTrack[]>([]);
  public isPlaying = this.dashboardService.isPlaying;
  public isPlayingPlaylist = computed(() => {
    return this.dashboardService.isPlaying() && this.currentTrack()?.playlistId === this.playlistId();
  })

  constructor() {
    effect(() => {
      if (!this.playlistId()) return;
      this.playlistsService.getPlaylistTracks(this.playlistId()).pipe(
        map(rs => this.filterResponseData(rs)),
      ).subscribe(rs => {
        this.playlistTracks.set(rs);
      });
    });
  }

  private filterResponseData(data: SpotifyPlaylistTrackResponse): PlaylistTrack[] {
    return data.items.map((item) => ({
      playlistId: this.playlistId(),
      artists: item.track.artists.map(a => a.name),
      name: item.track.name,
      imageUrl: item.track.album.images ? (item.track.album.images[0].url || item.track.album.images[1].url) : '',
      previewUrl: item.track.preview_url ?? '',
      trackId: item.track.id,
    }))
  }

  onChangePlayerStatus() {
    if (!this.isPlayingPlaylist()) {
      this.dashboardService.setIsPlaying(false);
      this.dashboardService.setCurrentPlaylistTracks(this.playlistTracks())
      this.dashboardService.setCurrentTrack(this.playlistTracks()[0]);
    }
    this.dashboardService.switchIsPlaying();
  }
}
