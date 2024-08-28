import {Component, input} from '@angular/core';
import {ArtistInfo} from "@shared/components/now-playing/now-playing.component";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-main-artist-card',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './main-artist-card.component.html',
})
export class MainArtistCardComponent {
  public artist = input.required<ArtistInfo | undefined>()
}
