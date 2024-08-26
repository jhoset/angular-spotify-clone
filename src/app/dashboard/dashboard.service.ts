import {computed, inject, Injectable, signal} from '@angular/core';
import {PlaylistsService} from "@core/services/playlists/playlists.service";
import {SpotifyPlaylist} from "@core/services/playlists/interfaces";
import {catchError, of, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HttpErrorResponse} from "@angular/common/http";


export interface DashboardState {
  isLoading: boolean;
  playlists: SpotifyPlaylist[];
  player: PlayerState;
  playlistSelected: PlaylistSelectedState;
  playlistForPlayback: PlaylistForPlaybackState;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  //************************************************* SERVICES *********************************************************
  private playlistsService: PlaylistsService = inject(PlaylistsService);
  //***************************************************** STATE ********************************************************
  private state = signal<DashboardState>(DASHBOARD_INITIAL_STATE)
  //*************************************************** SELECTORS ******************************************************
  public isLoading = computed(() => this.state().isLoading);
  public playlists = computed(() => this.state().playlists);
  public error = computed(() => this.state().error);
  //? SELECTED PLAYLIST
  public playlistSelected = computed(() => this.state().playlistSelected.playlist);
  public tracksOfPlaylistSelected = computed(() => this.state().playlistSelected.tracks);
  public isLoadingTracks = computed(() => this.state().playlistSelected.isLoading);
  //? FOR PLAYBACK
  public playlistForPlayback = computed(() => this.state().playlistForPlayback.playlist);
  public tracksOfPlaylistForPlayback = computed(() => this.state().playlistForPlayback.tracks);
  //? PLAYER
  public playerVolume = computed(() => this.state().player.volume);
  public isPlaying = computed(() => this.state().player.isPlaying);
  public currentTrack = computed(() => this.state().player.currentTrack);
  //********************************************************************************************************************
  public topSixPlaylists = computed(() => this.getTopSixPlaylists());

  constructor() {
    this.setIsLoading(true)
    this.playlistsService.getCurrentUserPlaylists().pipe(
      catchError(e => this.setError(e)),
      takeUntilDestroyed(),
    ).subscribe(rs => {
      if (rs) this.setPlaylists(rs.items)
      this.setIsLoading(false);
    });
  }

  //**************************************************** ACTIONS *******************************************************
  public setIsLoading(newValue: boolean) {
    this.state.update((state) => ({...state, isLoading: newValue}));
  }

  public setPlaylists(newValue: SpotifyPlaylist[]) {
    this.state.update((state) => ({...state, playlists: newValue}));
  }

  public setError(e: HttpErrorResponse) {
    this.state.update((state) => ({...state, error: this.getErrorMessage(e), isLoading: false}));
    return of([]);
  }

  public syncPlaylistForPlayback() {
    this.state.update((state) => ({
      ...state,
      playlistForPlayback: {
        tracks: state.playlistSelected.tracks,
        playlist: state.playlistSelected.playlist,
      },
    }));
  }

  public setPlaylistSelected(newValue: SpotifyPlaylist | undefined) {
    this.state.update((state) => ({
      ...state,
      playlistSelected: {...state.playlistSelected, playlist: newValue}
    }));
  }

  public setTracksOfPlaylistSelected(newValue: PlaylistTrack[]) {
    this.state.update((state) => ({
      ...state,
      playlistSelected: {...state.playlistSelected, tracks: newValue}
    }));
  }

  public setIsLoadingTracks(newValue: boolean) {
    this.state.update((state) => ({
      ...state,
      playlistSelected: {...state.playlistSelected, isLoading: newValue}
    }));
  }


  public setCurrentPlaylist(newValue: SpotifyPlaylist | undefined) {
    this.state.update((state) => ({
      ...state,
      playlistForPlayback: {...state.playlistForPlayback, playlist: newValue},
    }));
  }

  public setCurrentPlaylistTracks(newValue: PlaylistTrack[]) {
    this.state.update((state) => ({
      ...state,
      playlistForPlayback: {...state.playlistForPlayback, tracks: newValue},
    }));
  }

  public setVolume(newValue: number) {
    this.state.update((state) => ({
      ...state,
      player: {...state.player, volume: newValue}
    }));
  }

  public setCurrentTrack(newValue: PlaylistTrack | undefined) {
    this.state.update((state) => ({
      ...state,
      player: {...state.player, currentTrack: newValue}
    }));
  }

  public setIsPlaying(newValue: boolean) {
    this.state.update((state) => ({
      ...state,
      player: {...state.player, isPlaying: newValue}
    }));
  }

  public switchIsPlaying() {
    this.state.update((state) => ({
      ...state,
      player: {...state.player, isPlaying: !state.player.isPlaying}
    }));
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

  public getLocalPlaylistById(id: string) {
    return this.playlists().find(e => e.id === id);
  }
}

//**********************************************************************************************************************
//*                                               INTERFACES & CONSTANTS
//**********************************************************************************************************************

export interface PlaylistSelectedState {
  playlist: SpotifyPlaylist | undefined;
  tracks: PlaylistTrack[];
  isLoading: boolean;
}

export interface PlaylistForPlaybackState {
  playlist: SpotifyPlaylist | undefined;
  tracks: PlaylistTrack[];
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
    playlistSelected: {
      tracks: [],
      isLoading: false,
      playlist: undefined
    },
    playlistForPlayback: {
      playlist: undefined,
      tracks: [],
    },
    player: {
      volume: 1,
      isPlaying: false,
      currentTrack: undefined
    },
    error: null,
  }
