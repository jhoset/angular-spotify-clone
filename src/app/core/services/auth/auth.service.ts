import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";

export interface AuthRefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  refreshToken(refreshToken: string) {
    let params = new HttpParams();
    params = params.set('refresh_token', refreshToken);
    return this.http.get<AuthRefreshTokenResponse>(`${environment.SERVER_URL}/api/auth/refresh_token`, {params});
  }
}
