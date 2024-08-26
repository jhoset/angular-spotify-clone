import {Component, computed, inject, input} from '@angular/core';
import {DashboardService, PlaylistTrack} from "../../../dashboard.service";
import {NgClass} from "@angular/common";
import {CardPlayButtonComponent} from "@shared/components/card-play-button/card-play-button.component";
import {SvgIconComponent} from "angular-svg-icon";
import {TrackPlayButtonComponent} from "../track-play-button/track-play-button.component";

@Component({
  selector: '[appTrackListItem]',
  standalone: true,
  imports: [
    NgClass,
    CardPlayButtonComponent,
    SvgIconComponent,
    TrackPlayButtonComponent
  ],
  templateUrl: './track-list-item.component.html'
})
export class TrackListItemComponent {
  private dashboardService = inject(DashboardService);
  private currentTrack = this.dashboardService.currentTrack;
  private isPlaying = this.dashboardService.isPlaying;
  public index = input.required<number>()
  public track = input.required<PlaylistTrack>()
  public isPlayingCurrentTrack = computed(() => {
    return this.isPlaying() && this.currentTrack()?.trackId == this.track().trackId;
  })
  public isSelectedCurrentTrack = computed(() => {
    return this.currentTrack()?.trackId == this.track().trackId;
  })
}
