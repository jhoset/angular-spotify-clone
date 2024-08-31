import {Component, computed, inject} from '@angular/core';
import {DashboardService, PlaylistTrack} from "../../../../../dashboard/dashboard.service";
import {DecimalPipe} from "@angular/common";
import {SvgIconComponent} from "angular-svg-icon";
import {ImgFallbackDirective} from "@shared/directives/img-fallback.directive";

@Component({
  selector: 'app-next-in-queue',
  standalone: true,
  imports: [
    DecimalPipe,
    SvgIconComponent,
    ImgFallbackDirective,
  ],
  templateUrl: './next-in-queue.component.html',
})
export class NextInQueueComponent {
  private dashboardService = inject(DashboardService);

  public tracksOfPlaylistForPlayback = this.dashboardService.tracksOfPlaylistForPlayback;
  public currentTrack = this.dashboardService.currentTrack;

  public nextTrack = computed(() => this.getNextTrack())

  public getNextTrack(): PlaylistTrack | null {
    const index = this.getSongIndex(this.currentTrack()?.trackId || '');
    if (index > -1 && index + 1 < this.tracksOfPlaylistForPlayback().length) {
      return this.tracksOfPlaylistForPlayback()[index + 1];
    }
    return null;
  }

  public getSongIndex(id: string) {
    return this.tracksOfPlaylistForPlayback().findIndex(e => e.trackId === id);
  }

  onPlay() {
    const nextTrack = this.getNextTrack();
    if (!nextTrack) return;
    this.dashboardService.setCurrentTrack(nextTrack);
  }
}
