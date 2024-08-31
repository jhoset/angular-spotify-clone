import {Component, inject, input} from '@angular/core';
import {SpotifyPlaylist} from "@core/services/playlists/interfaces";
import {Router, RouterLink} from "@angular/router";
import {DashboardService} from "../../../../../dashboard/dashboard.service";
import {ImgFallbackDirective} from "@shared/directives/img-fallback.directive";

@Component({
  selector: 'app-side-menu-card',
  standalone: true,
  imports: [
    RouterLink,
    ImgFallbackDirective
  ],
  templateUrl: './side-menu-card.component.html',
})
export class SideMenuCardComponent {
  public playlist = input.required<SpotifyPlaylist>();
  public dashboardService = inject(DashboardService);
  private playlistSelected = this.dashboardService.playlistSelected;
  public router = inject(Router);

  public goToPlaylistView(id: string) {
    if (this.playlistSelected()?.id === id) return;
    this.dashboardService.setTracksOfPlaylistSelected([]);
    this.router.navigate(["/playlist", id]).then(() => {
      this.dashboardService.setPlaylistSelected(this.playlist());
    })
  }
}
