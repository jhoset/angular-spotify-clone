import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SpotifyUserProfile} from "@core/services/users/interfaces";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http: HttpClient = inject(HttpClient);

  getUserProfile(userId: string) {
    const url = `https://api.spotify.com/v1/users/${userId}`;
    return this.http.get<SpotifyUserProfile>(url);
  }
}
