import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs";
import {PlaylistItemCardComponent} from "../home/components/playlist-item-card/playlist-item-card.component";
import {DashboardService, PlaylistTrack} from "../dashboard.service";
import {DomSanitizer} from "@angular/platform-browser";
import {PlaylistsService} from "@core/services/playlists/playlists.service";
import {
  SpotifyPlaylistTrackResponse
} from "@core/services/playlists/interfaces";
import {SpotifyUserProfile} from "@core/services/users/interfaces";
import {UsersService} from "@core/services/users/users.service";
import {DecimalPipe, NgClass} from "@angular/common";
import {TrackListComponent} from "./components/track-list/track-list.component";
import {PlayButtonComponent} from "./components/play-button/play-button.component";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    PlaylistItemCardComponent,
    DecimalPipe,
    TrackListComponent,
    PlayButtonComponent,
    NgClass
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {
  public sanitizer = inject(DomSanitizer);
  private playlistsService: PlaylistsService = inject(PlaylistsService);
  private usersService: UsersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public dashboardService = inject(DashboardService);
  //? SIGNALS
  public playlistId = toSignal(this.route.params.pipe(map(p => p['id'])));
  public currentPlaylistTracks = this.dashboardService.currentPlaylistTracks;
  public currentPlaylist = this.dashboardService.currentPlaylist;
  public playlists = this.dashboardService.playlists;
  public playlists$ = toObservable(this.playlists);
  public owner = signal<SpotifyUserProfile | undefined>(undefined);

  constructor() {
    this.playlists$.pipe(
      takeUntilDestroyed()
    ).subscribe(rs => {
      if (!rs || !rs.length) return;
      const playlist = this.dashboardService.getLocalPlaylistById(this.playlistId());
      if (playlist) this.dashboardService.setCurrentPlaylist(playlist);
      if (!playlist) this.router.navigate(['/home']);
    })

    effect((onCleanup) => {
      const subscription$ = this.playlistsService.getPlaylistTracks(this.playlistId()).pipe(
        map(rs => this.filterResponseData(rs)),
      ).subscribe(rs => {
        this.dashboardService.setCurrentPlaylistTracks(rs)
      });

      onCleanup(() => {
        subscription$.unsubscribe();
      })
    });

    effect((onCleanup) => {
      if (!this.currentPlaylist()) return;
      const subscription$ = this.usersService.getUserProfile(this.currentPlaylist()!.owner.id!).subscribe(rs => {
        this.owner.set(rs);
      });

      onCleanup(() => {
        subscription$.unsubscribe();
      })
    });
  }

  private filterResponseData(data: SpotifyPlaylistTrackResponse): PlaylistTrack[] {
    return data.items.map((item) => {
      return {
        playlistId: this.playlistId(),
        artists: item.track.artists.map(a => a.name),
        name: item.track.name,
        imageUrl: item.track.album.images ? (item.track.album.images[0].url || item.track.album.images[1].url) : '',
        previewUrl: item.track.preview_url ?? '',
        trackId: item.track.id,
      }
    })
  }

}
