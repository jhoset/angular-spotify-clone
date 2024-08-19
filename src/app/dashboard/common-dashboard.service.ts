import {inject, Injectable, signal} from '@angular/core';
import {SpotifyPlaylist} from "@core/services/spotify/interfaces/spotify";
import {SpotifyService} from "@core/services/spotify/spotify.service";

@Injectable({
  providedIn: 'root'
})
export class CommonDashboardService {
  private spotifyService: SpotifyService = inject(SpotifyService);

  public spotifyPlayLists = signal<SpotifyPlaylist[]>([])

  constructor() {
    this.spotifyService.getCurrentUserPlaylists().subscribe(rs => {
      console.log('>>> Playlists retrieved!')
      this.spotifyPlayLists.set(rs.items);
    })
  }
}
