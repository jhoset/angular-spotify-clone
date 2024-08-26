import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CustomIconRegistryService} from "@shared/services/custom-icon-registry.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _iconRegistry: CustomIconRegistryService = inject(CustomIconRegistryService);

  constructor() {
    this._iconRegistry.addSvgIcon('library');
    this._iconRegistry.addSvgIcon('home');
    this._iconRegistry.addSvgIcon('pause');
    this._iconRegistry.addSvgIcon('play');
    this._iconRegistry.addSvgIcon('search');
    this._iconRegistry.addSvgIcon('time');
    this._iconRegistry.addSvgIcon('high-volume');
    this._iconRegistry.addSvgIcon('medium-volume');
    this._iconRegistry.addSvgIcon('low-volume');
    this._iconRegistry.addSvgIcon('zero-volume');
    this._iconRegistry.addSvgIcon('now-playing');
    this._iconRegistry.addSvgIcon('connect-device');
    this._iconRegistry.addSvgIcon('queue');
    this._iconRegistry.addSvgIcon('full-screen');
    this._iconRegistry.addSvgIcon('next');
    this._iconRegistry.addSvgIcon('prev');
    this._iconRegistry.addSvgIcon('repeat');
    this._iconRegistry.addSvgIcon('shuffle');
  }
}
