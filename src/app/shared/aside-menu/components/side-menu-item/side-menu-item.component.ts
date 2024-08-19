import {Component, input} from '@angular/core';

@Component({
  selector: 'app-side-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './side-menu-item.component.html',
})
export class SideMenuItemComponent {
  public href = input.required<string>()

}
