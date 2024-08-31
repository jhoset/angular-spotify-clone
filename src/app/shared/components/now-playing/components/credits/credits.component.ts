import {Component, input} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {ArtistInfo} from "@shared/components/now-playing/now-playing.component";
import {ImgFallbackDirective} from "@shared/directives/img-fallback.directive";

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [
    DecimalPipe,
    ImgFallbackDirective
  ],
  templateUrl: './credits.component.html',
})
export class CreditsComponent {
  public artists = input.required<ArtistInfo[]>();
  public isLoading = input.required();
}
