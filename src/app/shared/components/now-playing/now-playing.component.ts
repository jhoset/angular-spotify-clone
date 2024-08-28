import {Component, effect, inject, signal} from '@angular/core';
import {DashboardService, PlaylistTrack} from "../../../dashboard/dashboard.service";
import {ArtistsService} from "@core/services/artists/artists.service";
import {Artist, ArtistsResponse} from "@core/services/artists/interfaces";
import {map} from "rxjs";
import {
  MainArtistCardComponent
} from "@shared/components/now-playing/components/main-artist-card/main-artist-card.component";
import {CreditsComponent} from "@shared/components/now-playing/components/credits/credits.component";
import {NextInQueueComponent} from "@shared/components/now-playing/components/next-in-queue/next-in-queue.component";

@Component({
  selector: 'app-now-playing',
  standalone: true,
  imports: [
    MainArtistCardComponent,
    CreditsComponent,
    NextInQueueComponent
  ],
  templateUrl: './now-playing.component.html',
  styleUrl: './now-playing.component.scss'
})
export class NowPlayingComponent {
  private dashboardService = inject(DashboardService);
  private artistsService = inject(ArtistsService);

  public playlistForPlayback = this.dashboardService.playlistForPlayback;
  public currentTrack = this.dashboardService.currentTrack;
  public artists = signal<ArtistInfo[]>([]);

  constructor() {
    effect((onCleanup) => {
      console.log('TEST')
      if (!this.currentTrack()) return;
      const artistIds = this.currentTrack()?.artists.map(a => a.id) || [];
      const subscription$ = this.artistsService.getSeveralArtists(artistIds).pipe(
        map(rs => this.filterData(rs.artists))
      ).subscribe(rs => {
        console.log('rs', rs);
        this.artists.set(rs)
      })
      onCleanup(() => {
        subscription$.unsubscribe();
      })
    }, {allowSignalWrites: true});
  }

  private filterData(data: Artist[]) {
    const filterResult: ArtistInfo[] = data.map(a => ({
      artistId: a.id,
      followers: a.followers.total,
      name: a.name,
      imageUrl: a.images ? a.images[0].url : '',
      smallImageUrl: a.images ? (a.images[2].url || a.images[1].url) : '',
      genres: a.genres
    }))

    return filterResult;
  }
}

export interface ArtistInfo {
  artistId: string;
  name: string;
  imageUrl: string;
  smallImageUrl: string;
  followers: number;
  genres: string[];
}