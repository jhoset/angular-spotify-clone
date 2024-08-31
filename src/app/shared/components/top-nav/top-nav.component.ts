import {Component, inject} from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink
  ],
  templateUrl: './top-nav.component.html',
})
export class TopNavComponent {
  private router = inject(Router)

  public onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/auth/login']);
  }
}
