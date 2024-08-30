import { Component } from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {RouterLink} from "@angular/router";

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

}
