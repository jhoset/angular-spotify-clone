import {Component, input} from '@angular/core';
import {SpotifyPlaylist} from "@core/services/playlists/interfaces";

@Component({
  selector: 'app-side-menu-card',
  standalone: true,
  imports: [],
  templateUrl: './side-menu-card.component.html',
})
export class SideMenuCardComponent {
  public playlist= input.required<SpotifyPlaylist>()

}
