import {Component, input} from '@angular/core';
import {PlaylistTrack} from "../../../../../dashboard/dashboard.service";
import {SvgIconComponent} from "angular-svg-icon";
import {ImgFallbackDirective} from "@shared/directives/img-fallback.directive";

@Component({
  selector: 'app-current-track',
  standalone: true,
  imports: [
    SvgIconComponent,
    ImgFallbackDirective
  ],
  templateUrl: './current-track.component.html',
})
export class CurrentTrackComponent {
  public track = input<PlaylistTrack>();
}
