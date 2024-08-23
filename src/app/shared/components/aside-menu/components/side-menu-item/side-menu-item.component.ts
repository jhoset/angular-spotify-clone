import {Component, input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-side-menu-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './side-menu-item.component.html',
})
export class SideMenuItemComponent {
  public href = input.required<string>()

}
