import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {lastValueFrom, map} from "rxjs";
import {
  SpotifyFeaturedPlaylistResponse,
  SpotifyPlaylist, SpotifyPlaylistImageResponse,
  SpotifyPlaylistTrackResponse
} from "@core/services/playlists/interfaces";

const COLORS: { [key: string]: any } = {
  red: {accent: "#da2735", dark: "#7f1d1d"},
  orange: {accent: "#cc5400", dark: "#7c2d12"},
  yellow: {accent: "#ffae00", dark: "#78350f"},
  green: {accent: "#21c872", dark: "#14532d"},
  teal: {accent: "#2ee9d7", dark: "#134e4a"},
  blue: {accent: "#1e3a8a", dark: "#1e3a8a"},
  indigo: {accent: "#394bd5", dark: "#312e81"},
  purple: {accent: "#df24ff", dark: "#581c87"},
  pink: {accent: "#f33b73", dark: "#831843"},
  emerald: {accent: "#0c6e54", dark: "#064e3b"},
  rose: {accent: "#ed2377", dark: "#871b48"},
  gray: {accent: "#555555", dark: "#27272a"},
};
const COLOR_KEYS: string[] = Object.keys(COLORS);

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private http: HttpClient = inject(HttpClient);

  getCurrentUserPlaylists(limit: number = 20, offset: number = 0) {
    let params = new HttpParams();
    params = params.set('limit', limit.toString());
    params = params.set('offset', offset.toString());

    // @ts-ignore
    return this.http.get<SpotifyPlaylistResponse>('https://api.spotify.com/v1/me/playlists', {params})
      .pipe(
        map(response => {
          response.items.forEach((playList: SpotifyPlaylist) => {
            const randomIndex = Math.floor(Math.random() * COLOR_KEYS.length);
            const colorKey = COLOR_KEYS[randomIndex];
            playList.color = COLORS[colorKey];
          });
          return response;
        })
      );
  }

  getFeaturedPlaylists(limit: number = 20, offset: number = 0, locale?: string) {
    let params = new HttpParams();
    params = params.set('limit', limit.toString());
    params = params.set('offset', offset.toString());
    if (locale) {
      params = params.set('locale', locale);
    }

    return this.http.get<SpotifyFeaturedPlaylistResponse>('https://api.spotify.com/v1/browse/featured-playlists', {params})
      .pipe(
        map(response => {
          response.playlists.items.forEach((playList: SpotifyPlaylist) => {
            const randomIndex = Math.floor(Math.random() * COLOR_KEYS.length);
            const colorKey = COLOR_KEYS[randomIndex];
            playList.color = COLORS[colorKey];
          });
          return response;
        })
      );
  }

  getPlaylistTracks(playlistId: string, limit: number = 20, offset: number = 0) {
    let params = new HttpParams();
    params = params.set('limit', limit);
    params = params.set('offset', offset);

    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    return this.http.get<SpotifyPlaylistTrackResponse>(url, {params: params}).pipe(
      map(res => {
        res.items.forEach(item => item.playlistId = playlistId)
        res.items.map(async item => {
          if (!item.track.preview_url) {
            item.track.preview_url = await lastValueFrom(this.getPreviewUrl(item.track.id));
          }
        })
        res.items = res.items.filter(item => item.track.preview_url?.length);
        return res;
      })
    );
  }

  getPlaylistCoverImage(playlistId: string) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/images`;
    return this.http.get<SpotifyPlaylistImageResponse[]>(url).pipe(map(rs => {
      if (rs.length) {
        return rs[0];
      }
      return null;
    }));
  }

  getPreviewUrl(trackId: string) {
    const url = `http://localhost:3000/api/track-preview/${trackId}`;
    return this.http.get(url, {responseType: 'text'});
  }


}
