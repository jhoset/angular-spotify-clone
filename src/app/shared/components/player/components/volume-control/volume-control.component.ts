import {Component, computed, inject} from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {DashboardService} from "../../../../../dashboard/dashboard.service";
import {NgClass} from "@angular/common";
import {CustomRangeSliderComponent} from "@shared/components/custom-range-slider/custom-range-slider.component";

@Component({
  selector: 'app-volume-control',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgClass,
    CustomRangeSliderComponent
  ],
  templateUrl: './volume-control.component.html',
})
export class VolumeControlComponent {
  public dashboardService = inject(DashboardService);
  //? SIGNALS
  public playerVolume = this.dashboardService.playerVolume;
  private previousVolumeValue: number = 0;

  onVolumeChange({target}: any) {
    this.dashboardService.setVolume(target.value / 100);
  }

  onSwitchVolume() {
    if (this.playerVolume() > 0) {
      this.previousVolumeValue = this.playerVolume();
      this.dashboardService.setVolume(0);
    } else {
      this.dashboardService.setVolume(this.previousVolumeValue);
    }
  }
}
