import {AfterViewInit, Component, effect, ElementRef, input, model, output, viewChild} from '@angular/core';
import {DecimalPipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-custom-range-slider',
  standalone: true,
  imports: [
    NgClass,
    DecimalPipe
  ],
  templateUrl: './custom-range-slider.component.html',
  styleUrl: './custom-range-slider.component.scss'
})
export class CustomRangeSliderComponent implements AfterViewInit {
  public value = input<number>(0);
  public customClass = input<string>();
  public step = input<number>();
  public max = input<number>();
  public min = input<number>();
  public disabled = input<boolean>(false);
  public onInputChange = output();
  public inputRangeRef = viewChild<ElementRef>('range');
  public onMouseUp = output();
  public onMouseDown = output();


  constructor() {
    effect(() => {
      if (!this.inputRangeRef() || !this.value() || this.inputRangeRef()?.nativeElement.max == 0) return;
      const inputRangeElement = this.inputRangeRef()?.nativeElement;
      const progressPercentage = (inputRangeElement.value * 100) / inputRangeElement?.max;
      this.updateSliderBackground(progressPercentage)
    });
  }

  ngAfterViewInit(): void {
    const inputRangeElement = this.inputRangeRef()?.nativeElement;
    const initialProgress = inputRangeElement.value;
    this.updateSliderBackground(initialProgress);
  }

  public onSliderChange(event: any) {
    const inputRangeElement = this.inputRangeRef()?.nativeElement;
    const progressPercentage = (inputRangeElement.value * 100) / inputRangeElement?.max;
    this.updateSliderBackground(progressPercentage)
    this.onInputChange.emit(event);
  }

  private updateSliderBackground(progress: number): void {
    const inputRangeElement = this.inputRangeRef()?.nativeElement;
    inputRangeElement.style.background = `linear-gradient(to right, var(--progress-color) ${progress}%, var(--track-color) ${progress}%)`;
  }

  public onMouseup(event: any) {
    this.onMouseUp.emit(event)
  }

  public onMousedown(event: any) {
    this.onMouseDown.emit(event)
  }


}
