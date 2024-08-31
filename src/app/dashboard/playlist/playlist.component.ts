import {Component, computed, DestroyRef, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs";
import {PlaylistCardComponent} from "../home/components/playlist-card/playlist-card.component";
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
import {ImgFallbackDirective} from "@shared/directives/img-fallback.directive";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    PlaylistCardComponent,
    DecimalPipe,
    TrackListComponent,
    PlayButtonComponent,
    NgClass,
    ImgFallbackDirective
  ],
  templateUrl: './playlist.component.html',
})
export class PlaylistComponent {
  private destroyRef = inject(DestroyRef);
  public sanitizer = inject(DomSanitizer);
  private playlistsService: PlaylistsService = inject(PlaylistsService);
  private usersService: UsersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public dashboardService = inject(DashboardService);
  //? SIGNALS
  public playlistId = toSignal(this.route.params.pipe(map(p => p['id'])));
  public playlistSelected = this.dashboardService.playlistSelected;
  public tracksOfPlaylistSelected = this.dashboardService.tracksOfPlaylistSelected;
  public playlistForPlayback = this.dashboardService.playlistForPlayback;

  public playlists = this.dashboardService.playlists;
  public playlists$ = toObservable(this.playlists);
  public owner = signal<SpotifyUserProfile | undefined>(undefined);

  constructor() {
    this.playlists$.pipe(
      takeUntilDestroyed()
    ).subscribe(rs => {
      if (!rs || !rs.length) return;
      const playlist = this.dashboardService.getLocalPlaylistById(this.playlistId());
      if (playlist) this.dashboardService.setPlaylistSelected(playlist);
      if (!playlist) this.router.navigate(['/home']);
    })

    this.route.params.pipe(
      map(p => p['id']),
      takeUntilDestroyed()
    ).subscribe(rs => {
      this.playlistsService.getPlaylistTracks(this.playlistId()).pipe(
        map(rs => this.filterResponseData(rs)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(rs => {
        this.dashboardService.setIsLoadingTracks(false);
        this.dashboardService.setTracksOfPlaylistSelected(rs);
        if (!this.playlistForPlayback()) this.dashboardService.syncPlaylistForPlayback();
      });
    })


    effect((onCleanup) => {
      if (!this.playlistSelected()) return;
      const subscription$ = this.usersService.getUserProfile(this.playlistSelected()!.owner.id!).subscribe(rs => {
        this.owner.set(rs);
      });

      onCleanup(() => {
        subscription$.unsubscribe();
      })
    }, {allowSignalWrites: true});
  }

  private filterResponseData(data: SpotifyPlaylistTrackResponse): PlaylistTrack[] {
    return data.items.map((item) => {
      return {
        playlistId: this.playlistId(),
        artists: item.track.artists,
        artistNames: item.track.artists.map(a => a.name),
        name: item.track.name,
        imageUrl: item.track.album.images ? (item.track.album.images[0].url || item.track.album.images[1].url) : '',
        smallImageUrl: item.track.album.images ? item.track.album.images[2].url : '',
        previewUrl: item.track.preview_url ?? '',
        trackId: item.track.id,
        addedAt: item.added_at,
        duration: item.track.duration_ms,
      }
    })
  }

}
