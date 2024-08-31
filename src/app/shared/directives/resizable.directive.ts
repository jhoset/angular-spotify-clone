import {AfterViewInit, Directive, ElementRef, HostListener, inject, input} from '@angular/core';
import {DashboardService} from "../../dashboard/dashboard.service";

@Directive({
  selector: '[appResizable]',
  standalone: true
})
export class ResizableDirective implements AfterViewInit {
  public resizeTarget = input.required<ResizeTarget>()
  public minWidth = input.required<number>();
  private resizerElement!: HTMLElement;
  private isResizing = false;
  private parentElement!: HTMLElement;
  private prevElement!: HTMLElement;
  private nextElement!: HTMLElement;
  private initialWidth!: number;
  private initialMouseX!: number;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.resizerElement = this.el.nativeElement;
    this.prevElement = this.resizerElement.previousElementSibling as HTMLElement;
    this.nextElement = this.resizerElement.nextElementSibling as HTMLElement;
    this.parentElement = this.resizerElement.parentElement as HTMLElement;

    this.resizerElement.addEventListener('mousedown', (e: MouseEvent) => this.onMouseDown(e));
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      let width: number;

      if (this.resizeTarget() === 'prev') {
        width = this.initialWidth + (event.clientX - this.initialMouseX);
      } else {
        width = this.initialWidth - (event.clientX - this.initialMouseX);
      }

      if (width < this.minWidth()) {
        width = this.minWidth();
      }

      const computedStyle = getComputedStyle(this.parentElement);
      const columns = computedStyle.getPropertyValue('grid-template-columns').split(' ');

      if (this.resizeTarget() === 'prev') {
        columns[0] = `${width}px`;
      } else if (this.resizeTarget() === 'next') {
        columns[4] = `${width}px`;
      }

      this.parentElement.style.gridTemplateColumns = `${columns[0]} 8px 1fr 8px ${columns[4]}`;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isResizing = false;
  }

  onMouseDown(event: MouseEvent) {
    this.isResizing = true;
    if (this.resizeTarget() === 'prev') {
      this.initialWidth = this.prevElement.offsetWidth;
    } else if (this.resizeTarget() === 'next') {
      this.initialWidth = this.nextElement.offsetWidth;
    }
    this.initialMouseX = event.clientX;
  }

}

export type ResizeTarget = 'prev' | 'next';
