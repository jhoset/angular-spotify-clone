import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild
} from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {DashboardService, PlaylistTrack} from "../../../dashboard/dashboard.service";
import {CurrentTrackComponent} from "@shared/components/player/components/current-track/current-track.component";
import {VolumeControlComponent} from "@shared/components/player/components/volume-control/volume-control.component";
import {
  PlaybackControlComponent
} from "@shared/components/player/components/playback-control/playback-control.component";
import {NgClass} from "@angular/common";
import {CustomRangeSliderComponent} from "@shared/components/custom-range-slider/custom-range-slider.component";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    SvgIconComponent,
    CurrentTrackComponent,
    VolumeControlComponent,
    PlaybackControlComponent,
    NgClass,
    CustomRangeSliderComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements AfterViewInit, OnDestroy {
  public dashboardService = inject(DashboardService);
  //? SIGNALS
  private audioRef = viewChild.required<ElementRef>('audioRef');
  public isPlaying = this.dashboardService.isPlaying;
  public currentTrack = this.dashboardService.currentTrack;
  public currentPlaylistTracks = this.dashboardService.currentPlaylistTracks;
  public playerVolume = this.dashboardService.playerVolume;
  public audioElement = signal<HTMLAudioElement | undefined>(undefined);
  public isLoadingTrack = signal<boolean>(false);

  constructor() {

    effect(() => {
      if (!this.audioElement()) return;
      console.log('fired isplaying?', this.isPlaying())
      this.isPlaying() ? this.audioElement()!.play() : this.audioElement()!.pause();
    });

    effect(() => {
      if (!this.audioElement() || !this.currentTrack()) return;
      console.log('fireed 2')
      if (!this.audioElement()?.paused) this.audioElement()!.pause();
      this.audioElement()!.src = this.currentTrack()!.previewUrl;
      this.audioElement()!.load();
    });

    effect(() => {
      this.audioElement()!.volume = this.playerVolume();
    });

  }

  ngAfterViewInit(): void {
    this.audioElement.set(this.audioRef().nativeElement as HTMLAudioElement);
    this.audioElement()?.addEventListener('loadstart', this.handleLoadstart);
    this.audioElement()?.addEventListener('loadeddata', this.handleLoadeddata);
    this.audioElement()?.addEventListener('ended', this.handleEnd);
  }

  ngOnDestroy() {
    this.audioElement()?.removeEventListener('loadstart', this.handleLoadstart);
    this.audioElement()?.removeEventListener('loadeddata', this.handleLoadeddata);
    this.audioElement()?.removeEventListener('ended', this.handleEnd);
  }

  public handleLoadstart = () => {
    this.isLoadingTrack.set(true);
    if (!this.isPlaying()) this.dashboardService.setIsPlaying(true);
    if (this.isPlaying()) this.audioElement()?.play();
  }

  public handleEnd = () => {
    console.log('end')
    this.dashboardService.setIsPlaying(false);
    const nextTrack = this.getNextTrack();
    if (nextTrack) {
      this.dashboardService.setCurrentTrack(nextTrack);
    }
    setTimeout(() => {
      if (nextTrack && !this.isPlaying()) this.dashboardService.setIsPlaying(true);
    }, 500)
  }

  public handleLoadeddata = () => {
    this.isLoadingTrack.set(false);
  }

  public onChangePlayerStatus() {
    this.dashboardService.switchIsPlaying();
  }

  public getSongIndex(id: string) {
    return this.currentPlaylistTracks().findIndex(e => e.trackId === id);
  }

  public getNextTrack(): PlaylistTrack | null {
    const index = this.getSongIndex(this.currentTrack()?.trackId || '');
    if (index > -1 && index + 1 < this.currentPlaylistTracks().length) {
      return this.currentPlaylistTracks()[index + 1];
    }
    return null;
  }

  public getPreviousTrack(): PlaylistTrack | null {
    const index = this.getSongIndex(this.currentTrack()?.trackId || '');
    if (index > -1 && index - 1 >= 0) {
      return this.currentPlaylistTracks()[index - 1];
    }
    return null;
  }

  public onNextTrack() {
    const nextTrack = this.getNextTrack();
    if (nextTrack) {
      this.dashboardService.setCurrentTrack(nextTrack);
      if (!this.isPlaying()) this.dashboardService.setIsPlaying(true);
    }
  }

  public onPreviousTrack() {
    const previousTrack = this.getPreviousTrack();
    if (previousTrack) {
      this.dashboardService.setCurrentTrack(previousTrack);
      if (!this.isPlaying()) this.dashboardService.setIsPlaying(true);
    }
  }


}
