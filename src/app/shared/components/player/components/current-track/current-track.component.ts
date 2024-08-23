import {Component, input} from '@angular/core';
import {PlaylistTrack} from "../../../../../dashboard/dashboard.service";

@Component({
  selector: 'app-current-track',
  standalone: true,
  imports: [],
  templateUrl: './current-track.component.html',
})
export class CurrentTrackComponent {
  public track = input<PlaylistTrack>();
}
