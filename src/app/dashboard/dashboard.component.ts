import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {AsideMenuComponent} from "@shared/aside-menu/aside-menu.component";

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet,
    AsideMenuComponent
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
