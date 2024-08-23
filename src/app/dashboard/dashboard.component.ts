import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {AsideMenuComponent} from "@shared/components/aside-menu/aside-menu.component";
import {PlayerComponent} from "@shared/components/player/player.component";

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet,
    AsideMenuComponent,
    PlayerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['accessToken'] && params['refreshToken']) {
        localStorage.setItem('token', JSON.stringify(params['accessToken']));
        localStorage.setItem('refreshToken', JSON.stringify(params['refreshToken']));
        window.history.pushState({}, '', '/home');
      }
    });
  }
}
