import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs";
import {PlaylistItemCardComponent} from "../home/components/playlist-item-card/playlist-item-card.component";
import {CommonDashboardService} from "../common-dashboard.service";
import {DomSanitizer} from "@angular/platform-browser";
import {PlaylistsService} from "@core/services/playlists/playlists.service";
import {SpotifyPlaylist, SpotifyPlaylistImageResponse, SpotifyPlaylistItem} from "@core/services/playlists/interfaces";
import {SpotifyUserProfile} from "@core/services/users/interfaces";
import {UsersService} from "@core/services/users/users.service";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    PlaylistItemCardComponent,
    DecimalPipe
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {
  public sanitizer = inject(DomSanitizer);
  private playlistsService: PlaylistsService = inject(PlaylistsService);
  private usersService: UsersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  public commonService = inject(CommonDashboardService);
  public playlistId = toSignal(this.route.params.pipe(map(p => p['id'])));
  public playlistItems = signal<SpotifyPlaylistItem[]>([]);
  public ownerProfile = signal<SpotifyUserProfile | undefined>(undefined);
  public currentPlaylist = computed<SpotifyPlaylist | undefined>(() => {
    console.log('getting current pl', this.playlistId())
    return this.commonService.spotifyPlaylists().find(pl => pl.id === this.playlistId())
  });

  constructor() {
    effect(() => {
      console.log('>>> Loading pl items!!')
      this.playlistsService.getPlaylistTracks(this.playlistId()).subscribe(rs => {
        this.playlistItems.set(rs.items);
      })
      this.usersService.getUserProfile(this.currentPlaylist()?.owner.id!).subscribe(rs => {
        this.ownerProfile.set(rs);
      })
    });
  }

}
