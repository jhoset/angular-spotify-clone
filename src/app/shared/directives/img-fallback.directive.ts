import {Directive, ElementRef, HostListener, input} from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]',
  standalone: true
})
export class ImgFallbackDirective {

  public imgFallbackPath = input('assets/icons/img-fallback.svg');

  constructor(private _elementRef: ElementRef) {
  }

  @HostListener('error')
  handleImgErrorEvent() {
    const element: HTMLImageElement = this._elementRef.nativeElement
    element.src = this.imgFallbackPath();
  }

}
