import {Component, input} from '@angular/core';
import {PlaylistTrack} from "../../../dashboard.service";
import {SvgIconComponent} from "angular-svg-icon";
import {TrackListItemComponent} from "../track-list-item/track-list-item.component";

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [
    SvgIconComponent,
    TrackListItemComponent
  ],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss'
})
export class TrackListComponent {
  public tracks = input.required<PlaylistTrack[]>()
}
