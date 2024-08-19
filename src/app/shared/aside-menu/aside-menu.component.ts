import {Component, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {SvgIconComponent} from "angular-svg-icon";
import {SideMenuItemComponent} from "@shared/aside-menu/components/side-menu-item/side-menu-item.component";
import {SideMenuCardComponent} from "@shared/aside-menu/components/side-menu-card/side-menu-card.component";
import {SpotifyPlaylist} from "@core/services/spotify/interfaces/spotify";
import {SpotifyService} from "@core/services/spotify/spotify.service";

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SideMenuItemComponent,
    SvgIconComponent,
    SideMenuCardComponent
  ],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})
export class AsideMenuComponent {

  public spotifyPlayLists = signal<SpotifyPlaylist[]>([])


  constructor(private spotifyService: SpotifyService) {
    this.spotifyService.getCurrentUserPlaylists().subscribe(rs => {
      console.log(rs.items)
      this.spotifyPlayLists.set(rs.items);
    })
  }

}
