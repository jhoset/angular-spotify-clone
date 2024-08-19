import {computed, inject, Injectable, signal} from '@angular/core';
import {PlaylistsService} from "@core/services/playlists/playlists.service";
import {SpotifyPlaylist} from "@core/services/playlists/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CommonDashboardService {
  private playlistsService: PlaylistsService = inject(PlaylistsService);

  public spotifyPlaylists = signal<SpotifyPlaylist[]>([])
  public topSixPlaylists = computed(() => {
    if (this.spotifyPlaylists().length > 6) {
      return this.spotifyPlaylists().slice(0, 6);
    }
    return this.spotifyPlaylists();
  })

  constructor() {
    this.playlistsService.getCurrentUserPlaylists().subscribe(rs => {
      console.log('>>> Playlists retrieved!')
      this.spotifyPlaylists.set(rs.items);
    })
  }

  public getCachedPlaylistById(id: string) {
    return this.spotifyPlaylists().find(pl => pl.id == id);
  }
}
