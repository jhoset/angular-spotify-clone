import {Component, effect, input, OnDestroy, signal} from '@angular/core';
import {DurationTimePipe} from "@shared/pipes/duration-time.pipe";
import {DecimalPipe} from "@angular/common";
import {CustomRangeSliderComponent} from "@shared/components/custom-range-slider/custom-range-slider.component";

@Component({
  selector: 'app-playback-control',
  standalone: true,
  imports: [
    DurationTimePipe,
    DecimalPipe,
    CustomRangeSliderComponent
  ],
  templateUrl: './playback-control.component.html'
})
export class PlaybackControlComponent implements OnDestroy {
  public audioPlayer = input<HTMLAudioElement>();
  public currentTime = signal(0);

  constructor() {
    effect(() => {
      if (!this.audioPlayer()) return;
      this.audioPlayer()?.addEventListener('timeupdate', this.handleTimeUpdate)
    });
  }


  public handleTimeUpdate = () => {
    this.currentTime.set(this.audioPlayer()!.currentTime ?? 0);
  }

  public onReproductionChange({target}: any) {
    this.audioPlayer()!.currentTime = target.value;
  }

  public onMouseDown() {
    this.audioPlayer()!.muted = true;
  }

  public onMouseUp() {
    this.audioPlayer()!.muted = false;
  }

  ngOnDestroy(): void {
    this.audioPlayer()?.removeEventListener('timeupdate', this.handleTimeUpdate)
  }

  protected readonly Math = Math;
}
