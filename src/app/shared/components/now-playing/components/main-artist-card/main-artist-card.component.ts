import {Component, inject, input} from '@angular/core';
import {ArtistInfo} from "@shared/components/now-playing/now-playing.component";
import {DecimalPipe} from "@angular/common";
import {SvgIconComponent} from "angular-svg-icon";
import {DashboardService} from "../../../../../dashboard/dashboard.service";

@Component({
  selector: 'app-main-artist-card',
  standalone: true,
  imports: [
    DecimalPipe,
    SvgIconComponent
  ],
  templateUrl: './main-artist-card.component.html',
})
export class MainArtistCardComponent {
  private dashboardService: DashboardService = inject(DashboardService);
  public artist = input.required<ArtistInfo | undefined>()
  public isLoading = input.required();

  public isLoadingTrack = this.dashboardService.isLoadingTracks();
}
