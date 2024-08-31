import {AfterViewInit, Directive, effect, ElementRef, inject} from '@angular/core';
import {DashboardService} from "../dashboard.service";

@Directive({
  selector: '[appHideDisplay]',
  standalone: true
})
export class HideDisplayDirective implements AfterViewInit{
  private previousValue!: string;
  private nowPlayingView!: HTMLElement;
  private parentElement!: HTMLElement;
  private dashboardService = inject(DashboardService);

  public displayNowPlayingView = this.dashboardService.displayNowPlayingView;
  public currentTrack = this.dashboardService.currentTrack;
  public isPlaying = this.dashboardService.isPlaying;

  constructor(private el: ElementRef) {
    effect(() => {
      if (!this.el) return;
      const computedStyle = getComputedStyle(this.parentElement);
      const columns = computedStyle.getPropertyValue('grid-template-columns').split(' ');
      if (!this.displayNowPlayingView()) {
        this.previousValue = columns[4];
        this.parentElement.style.gridTemplateColumns = `${columns[0]} 8px 1fr 0px 0px`;
      } else {
        this.parentElement.style.gridTemplateColumns = `${columns[0]} 8px 1fr 8px ${this.previousValue}`;
      }
    });
  }

  ngAfterViewInit() {
    this.nowPlayingView = this.el.nativeElement;
    this.parentElement = this.nowPlayingView.parentElement as HTMLElement;
  }

}
