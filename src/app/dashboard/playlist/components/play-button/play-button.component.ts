import {Component, computed, inject, input} from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {DashboardService} from "../../../dashboard.service";

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [
    SvgIconComponent
  ],
  templateUrl: './play-button.component.html'
})
export class PlayButtonComponent {
  public dashboardService = inject(DashboardService);

  public playlistId = input.required<string>();
  public currentTrack = this.dashboardService.currentTrack;
  public playlistForPlayback = this.dashboardService.playlistForPlayback;
  public tracksOfPlaylistSelected = this.dashboardService.tracksOfPlaylistSelected;

  public isPlayingPlaylist = computed(() => {
    return this.dashboardService.isPlaying() && this.currentTrack()?.playlistId === this.playlistId();
  })

  onChangePlayerStatus() {
    if (!this.currentTrack() || this.currentTrack()?.playlistId !== this.playlistId()) {
      if (this.playlistForPlayback() && this.playlistForPlayback()?.id !== this.playlistId()) {
        this.dashboardService.syncPlaylistForPlayback();
      }
      this.dashboardService.setCurrentTrack(this.tracksOfPlaylistSelected()[0]);
      return;
    }
    this.dashboardService.switchIsPlaying();
  }
}
