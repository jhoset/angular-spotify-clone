import {Component, inject, input} from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {DashboardService, PlaylistTrack} from "../../../dashboard.service";

@Component({
  selector: 'app-track-play-button',
  standalone: true,
  imports: [
    SvgIconComponent
  ],
  templateUrl: './track-play-button.component.html',
})
export class TrackPlayButtonComponent {
  private dashboardService = inject(DashboardService);
  private currentTrack = this.dashboardService.currentTrack;
  private isPlaying = this.dashboardService.isPlaying;
  public track = input.required<PlaylistTrack>();
  public isPlayingCurrentTrack = input.required<boolean>();


  onChangePlayerStatus() {
    if (!this.currentTrack() || this.currentTrack()?.trackId !== this.track().trackId) {
      this.dashboardService.setCurrentTrack(this.track());
      return;
    }
    this.dashboardService.switchIsPlaying();
  }
}
