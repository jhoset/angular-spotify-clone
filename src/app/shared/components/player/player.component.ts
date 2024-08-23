import {AfterViewInit, Component, computed, effect, ElementRef, inject, signal, viewChild} from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {DashboardService, PlaylistTrack} from "../../../dashboard/dashboard.service";
import {CurrentTrackComponent} from "@shared/components/player/components/current-track/current-track.component";
import {VolumeControlComponent} from "@shared/components/player/components/volume-control/volume-control.component";
import {PlaybackControlComponent} from "@shared/components/player/components/playback-control/playback-control.component";
import {NgClass} from "@angular/common";
import {BehaviorSubject, Subject} from "rxjs";
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
export class PlayerComponent implements AfterViewInit {
  public dashboardService = inject(DashboardService);
  //? SIGNALS
  private audioRef = viewChild.required<ElementRef>('audioRef');
  public isPlaying = this.dashboardService.isPlaying;
  public currentTrack = this.dashboardService.currentTrack;
  public currentPlaylistTracks = this.dashboardService.currentPlaylistTracks;
  public playerVolume = this.dashboardService.playerVolume;
  public audioElement = signal<HTMLAudioElement | undefined>(undefined);

  constructor() {

    effect(() => {
      if (!this.audioElement()) return;
      console.log('fired isplaying?', this.isPlaying())
      this.isPlaying() ? this.audioElement()!.play() : this.audioElement()!.pause();
    });

    effect(() => {
      if (!this.audioElement() || !this.currentTrack()) return;
      console.log('fireed 2')
      this.audioElement()!.pause();
      this.audioElement()!.src = this.currentTrack()!.previewUrl;
    });

    effect(() => {
      this.audioElement()!.volume = this.playerVolume();
    });

  }

  ngAfterViewInit(): void {
    this.audioElement.set(this.audioRef().nativeElement as HTMLAudioElement);
    this.audioElement()?.addEventListener('loadstart', (event) => {
      console.log(`'${event.type}' event fired`);
      this.audioElement()?.play();
    })
    this.audioElement()?.addEventListener('ended', (event) => {
      console.log('end')
      this.dashboardService.setIsPlaying(false);
      const nextTrack = this.getNextTrack();
      if (nextTrack) {
        this.dashboardService.setCurrentTrack(nextTrack);
        this.audioElement()!.src = nextTrack.previewUrl;
        this.audioElement()!.load();
        this.dashboardService.setIsPlaying(true);
      }
    })
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

  public handleNextEvent() {
    const index = this.getSongIndex(this.currentTrack()?.trackId || '');
    if (index > -1 && index + 1 < this.currentPlaylistTracks().length) {
      this.dashboardService.setIsPlaying(false);
      this.dashboardService.setCurrentTrack(this.currentPlaylistTracks()[index + 1])
      this.dashboardService.setIsPlaying(true);
    }
  }

  public handlePrevEvent() {
    const index = this.getSongIndex(this.currentTrack()?.trackId || '');
    if (index > 0) {
      this.dashboardService.setIsPlaying(false);
      this.dashboardService.setCurrentTrack(this.currentPlaylistTracks()[index - 1]);
      this.dashboardService.setIsPlaying(true);
    }
  }

}
