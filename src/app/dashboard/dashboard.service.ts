import {computed, inject, Injectable, signal} from '@angular/core';
import {PlaylistsService} from "@core/services/playlists/playlists.service";
import {SpotifyPlaylist} from "@core/services/playlists/interfaces";
import {catchError, of, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  //************************************************* SERVICES *********************************************************
  private playlistsService: PlaylistsService = inject(PlaylistsService);
  //***************************************************** STATE ********************************************************
  private state = signal<DashboardState>(DASHBOARD_INITIAL_STATE)
  //*************************************************** SELECTORS ******************************************************
  public isLoading = computed<boolean>(() => this.state().isLoading);
  public playlists = computed<SpotifyPlaylist[]>(() => this.state().playlists);
  public currentPlaylist = computed<SpotifyPlaylist | undefined>(() => this.state().currentPlaylist);
  public currentPlaylistTracks = computed<PlaylistTrack[]>(() => this.state().currentPlaylistTracks);
  public playerVolume = computed<number>(() => this.state().player.volume);
  public isPlaying = computed<boolean>(() => this.state().player.isPlaying);
  public currentTrack = computed<PlaylistTrack | undefined>(() => this.state().player.currentTrack);
  public error = computed(() => this.state().error);
  //********************************************************************************************************************
  public topSixPlaylists = computed(() => this.getTopSixPlaylists());

  constructor() {
    this.playlistsService.getCurrentUserPlaylists().pipe(
      tap(() => this.setIsLoading(true)),
      catchError(e => this.setError(e)),
      takeUntilDestroyed(),
    ).subscribe(rs => this.setPlaylists(rs.items));
  }

  //**************************************************** ACTIONS *******************************************************
  public setIsLoading(newValue: boolean) {
    this.state.update((state) => ({...state, isLoading: newValue}));
  }

  public setPlaylists(newValue: SpotifyPlaylist[]) {
    this.state.update((state) => ({...state, playlists: newValue, isLoading: false}));
  }

  public setCurrentPlaylist(newValue: SpotifyPlaylist | undefined) {
    this.state.update((state) => ({...state, currentPlaylist: newValue}));
  }

  public setVolume(newValue: number) {
    this.state.update((state) => ({...state, player: {...state.player, volume: newValue}}));
  }

  public setCurrentPlaylistTracks(newValue: PlaylistTrack[]) {
    this.state.update((state) => ({...state, currentPlaylistTracks: newValue}));
  }

  public setCurrentTrack(newValue: PlaylistTrack | undefined) {
    this.state.update((state) => ({...state, player: {...state.player, currentTrack: newValue}}));
  }

  public setIsPlaying(newValue: boolean) {
    this.state.update((state) => ({...state, player: {...state.player, isPlaying: newValue}}));
  }

  public switchIsPlaying() {
    this.state.update((state) => ({...state, player: {...state.player, isPlaying: !state.player.isPlaying}}));
  }

  public setError(e: HttpErrorResponse) {
    this.state.update((state) => ({...state, error: this.getErrorMessage(e)}))
    return of([]);
  }

  //********************************************************************************************************************

  getErrorMessage(err: HttpErrorResponse) {
    let errorMsg: string;
    if (err.error instanceof ErrorEvent) {
      //? Client-side or Network Error
      errorMsg = `An error occurred: ${err.error.message}`;
    } else {
      //? Backend Error -> Handle checking metadata or response status
      errorMsg = `Server error -> ${err.status}: ${err.message}`;
    }
    return errorMsg;
  }

  public getTopSixPlaylists() {
    const playlists = this.state().playlists;
    if (playlists?.length > 6) return playlists.slice(0, 6);
    return playlists;
  }

  public clearPlaylistWithTracks() {
    this.setCurrentPlaylist(undefined);
    this.setCurrentPlaylistTracks([]);
  }

  public getLocalPlaylistById(id: string) {
    return this.playlists().find(e => e.id === id);
  }
}

//**********************************************************************************************************************
//*                                               INTERFACES & CONSTANTS
//**********************************************************************************************************************

export interface DashboardState {
  isLoading: boolean;
  playlists: SpotifyPlaylist[];
  currentPlaylist: SpotifyPlaylist | undefined;
  currentPlaylistTracks: PlaylistTrack[];
  player: PlayerState;
  error: string | null;
}

export interface PlayerState {
  isPlaying: boolean;
  currentTrack: PlaylistTrack | undefined;
  volume: number;
}

export interface PlaylistTrack {
  playlistId: string;
  trackId: string;
  imageUrl: string;
  previewUrl: string;
  name: string;
  artists: string[];
}

export const DASHBOARD_INITIAL_STATE: DashboardState =
  {
    isLoading: false,
    playlists: [],
    currentPlaylist: undefined,
    currentPlaylistTracks: [],
    player: {
      volume: 1,
      isPlaying: false,
      currentTrack: undefined
    },
    error: null,
  }
