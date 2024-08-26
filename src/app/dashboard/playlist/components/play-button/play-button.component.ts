import {Component, computed, inject, input, signal} from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {DashboardService, PlaylistTrack} from "../../../dashboard.service";

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
  public currentTrack = this.dashboardService.currentTrack;
  public playlistTracks = this.dashboardService.currentPlaylistTracks;
  public playlistId = input.required<string>();
  public isPlayingPlaylist = computed(() => {
    return this.dashboardService.isPlaying() && this.currentTrack()?.playlistId === this.playlistId();
  })


  onChangePlayerStatus() {

    if (!this.currentTrack() || this.currentTrack()?.playlistId !== this.playlistId()) {
      this.dashboardService.setCurrentTrack(this.playlistTracks()[0]);
      return;
    }
    this.dashboardService.switchIsPlaying();
  }
}
