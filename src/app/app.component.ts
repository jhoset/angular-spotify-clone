import {Component, inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {CustomIconRegistryService} from "@shared/services/custom-icon-registry.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _iconRegistry: CustomIconRegistryService = inject(CustomIconRegistryService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  constructor() {
    this.router.events.pipe(
      takeUntilDestroyed()
    ).subscribe(event => {
      if (event instanceof NavigationStart) {
        const params = new URLSearchParams(event.url.split('?')[1]); // Extract query string
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');
        if (!accessToken || !refreshToken) return;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        window.history.pushState({}, '', '/home');
      }
    });
    this.registerIcons();
  }

  public registerIcons() {
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
    this._iconRegistry.addSvgIcon('logo');
    this._iconRegistry.addSvgIcon('github');
    this._iconRegistry.addSvgIcon('logout');
  }
}
