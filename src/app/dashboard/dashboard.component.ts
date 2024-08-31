import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {AsideMenuComponent} from "@shared/components/aside-menu/aside-menu.component";
import {PlayerComponent} from "@shared/components/player/player.component";
import {NowPlayingComponent} from "@shared/components/now-playing/now-playing.component";
import {ResizableDirective} from "@shared/directives/resizable.directive";
import {TopNavComponent} from "@shared/components/top-nav/top-nav.component";
import {HideDisplayDirective} from "./directives/hide-display.directive";

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet,
    AsideMenuComponent,
    PlayerComponent,
    NowPlayingComponent,
    ResizableDirective,
    TopNavComponent,
    HideDisplayDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['accessToken'] && params['refreshToken']) {
        localStorage.setItem('token', params['accessToken']);
        localStorage.setItem('refresh_token', params['refreshToken']);
        window.history.pushState({}, '', '/home');
      }
    });
  }
}
