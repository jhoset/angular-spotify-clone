import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {SvgIconComponent} from "angular-svg-icon";
import {SideMenuItemComponent} from "@shared/components/aside-menu/components/side-menu-item/side-menu-item.component";
import {SideMenuCardComponent} from "@shared/components/aside-menu/components/side-menu-card/side-menu-card.component";
import {DashboardService} from "../../../dashboard/dashboard.service";

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SideMenuItemComponent,
    SvgIconComponent,
    SideMenuCardComponent
  ],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})
export class AsideMenuComponent {
  public dashboardService = inject(DashboardService);
  //? SIGNALS
  public playlists = this.dashboardService.playlists;
  public isLoading = this.dashboardService.isLoading;
}
