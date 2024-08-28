import {Component, input} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {ArtistInfo} from "@shared/components/now-playing/now-playing.component";

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './credits.component.html',
})
export class CreditsComponent {
  public artists = input.required<ArtistInfo[]>()
}
