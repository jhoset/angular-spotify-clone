import {AfterViewInit, Component, computed, DestroyRef, inject, input, signal} from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {DashboardService, PlaylistTrack} from "../../../dashboard.service";
import {PlaylistsService} from "@core/services/playlists/playlists.service";
import {map} from "rxjs";
import {SpotifyPlaylist, SpotifyPlaylistTrackResponse} from "@core/services/playlists/interfaces";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-card-play-button',
  standalone: true,
  imports: [
    SvgIconComponent
  ],
  templateUrl: './card-play-button.component.html',
})
export class CardPlayButtonComponent implements AfterViewInit {
  private destroyRef = inject(DestroyRef);
  private dashboardService = inject(DashboardService);
  private playlistsService = inject(PlaylistsService);
  //? SIGNALS
  public currentTrack = this.dashboardService.currentTrack;
  public isPlaying = this.dashboardService.isPlaying;

  public playlist = input.required<SpotifyPlaylist>();
  public playlistTracks = signal<PlaylistTrack[]>([]);

  public isPlayingPlaylist = computed(() => {
    return this.isPlaying() && this.currentTrack()?.playlistId === this.playlist().id;
  })

  ngAfterViewInit() {
    this.playlistsService.getPlaylistTracks(this.playlist().id).pipe(
      map(rs => this.filterResponseData(rs)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(rs => {
      console.log('Setting signal')
      this.playlistTracks.set(rs);
    });
  }


  private filterResponseData(data: SpotifyPlaylistTrackResponse): PlaylistTrack[] {
    return data.items.map((item) => ({
      playlistId: this.playlist().id,
      artists: item.track.artists.map(a => a.name),
      name: item.track.name,
      imageUrl: item.track.album.images ? (item.track.album.images[0].url || item.track.album.images[1].url) : '',
      previewUrl: item.track.preview_url ?? '',
      trackId: item.track.id,
    }))
  }

  onChangePlayerStatus() {
    if (this.currentTrack()?.playlistId !== this.playlist().id) {
      this.dashboardService.setPlaylistSelected(this.playlist());
      this.dashboardService.setTracksOfPlaylistSelected(this.playlistTracks());
      this.dashboardService.syncPlaylistForPlayback();
      this.dashboardService.setCurrentTrack(this.playlistTracks()[0]);
      return;
    }
    this.dashboardService.switchIsPlaying();
  }
}
