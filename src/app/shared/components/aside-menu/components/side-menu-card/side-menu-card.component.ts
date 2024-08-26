import {Component, inject, input} from '@angular/core';
import {SpotifyPlaylist} from "@core/services/playlists/interfaces";
import {Router, RouterLink} from "@angular/router";
import {DashboardService} from "../../../../../dashboard/dashboard.service";

@Component({
  selector: 'app-side-menu-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './side-menu-card.component.html',
})
export class SideMenuCardComponent {
  public playlist = input.required<SpotifyPlaylist>()
  public dashboardService = inject(DashboardService);
  public router = inject(Router);

  public goToPlaylistView(id: string) {

    this.router.navigate(["/playlist", id]).then(() => {
      this.dashboardService.clearPlaylistWithTracks();
      this.dashboardService.setCurrentPlaylist(this.playlist());
    })
  }
}
