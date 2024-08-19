import {Component, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {SpotifyPlaylist} from "@core/services/playlists/interfaces";

@Component({
  selector: 'app-playlist-item-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './playlist-item-card.component.html',
  styleUrl: './playlist-item-card.component.scss'
})
export class PlaylistItemCardComponent {
  public playlist = input.required<SpotifyPlaylist>();
}
