import {Component, computed, inject, input} from '@angular/core';
import {DashboardService, PlaylistTrack} from "../../../dashboard.service";
import {DecimalPipe, NgClass} from "@angular/common";
import {CardPlayButtonComponent} from "../../../home/components/card-play-button/card-play-button.component";
import {SvgIconComponent} from "angular-svg-icon";
import {TrackItemPlayButtonComponent} from "../track-item-play-button/track-item-play-button.component";
import {DurationTimePipe} from "@shared/pipes/duration-time.pipe";
import {ImgFallbackDirective} from "@shared/directives/img-fallback.directive";

@Component({
  selector: '[appTrackListItem]',
  standalone: true,
  imports: [
    NgClass,
    CardPlayButtonComponent,
    SvgIconComponent,
    TrackItemPlayButtonComponent,
    DurationTimePipe,
    DecimalPipe,
    ImgFallbackDirective
  ],
  templateUrl: './track-list-item.component.html'
})
export class TrackListItemComponent {
  private dashboardService = inject(DashboardService);

  public index = input.required<number>()
  public track = input.required<PlaylistTrack>()
  private currentTrack = this.dashboardService.currentTrack;
  private isPlaying = this.dashboardService.isPlaying;

  public isPlayingCurrentTrack = computed(() => {
    return this.isPlaying() && this.currentTrack()?.trackId == this.track().trackId;
  })
  public isSelectedCurrentTrack = computed(() => {
    return this.currentTrack()?.trackId == this.track().trackId;
  })
  protected readonly Number = Number;
}
