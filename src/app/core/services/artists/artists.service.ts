import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Artist, ArtistsResponse} from "@core/services/artists/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  private readonly baseUrl = 'https://api.spotify.com/v1/artists';
  private http = inject(HttpClient);

  constructor() {
  }

  getSeveralArtists(ids: string[]) {
    const url = `${this.baseUrl}?ids=${ids.join(',')}`;
    return this.http.get<ArtistsResponse>(url);
  }

  getArtist(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Artist>(url);
  }
}
