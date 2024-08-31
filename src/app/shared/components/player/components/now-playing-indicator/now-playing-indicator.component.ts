import {Component, inject} from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {DashboardService} from "../../../../../dashboard/dashboard.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-now-playing-indicator',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgClass
  ],
  templateUrl: './now-playing-indicator.component.html',
})
export class NowPlayingIndicatorComponent {
  public dashboardService = inject(DashboardService);
  //? SIGNALS
  public displayNowPlayingView = this.dashboardService.displayNowPlayingView;
  public currentTrack = this.dashboardService.currentTrack;

  public onToggleView() {
    if (!this.displayNowPlayingView()) {
      this.dashboardService.setDisplayNowPlayingView(true);
    } else {
      this.dashboardService.setDisplayNowPlayingView(false)
    }

  }
}
