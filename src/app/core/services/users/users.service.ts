import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SpotifyUserProfile} from "@core/services/users/interfaces";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http: HttpClient = inject(HttpClient);

  getUserProfile(userId: string) {
    const url = `${environment.SPOTIFY_API_URL}/users/${userId}`;
    return this.http.get<SpotifyUserProfile>(url);
  }
}
