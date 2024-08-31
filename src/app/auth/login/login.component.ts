import { Component } from '@angular/core';
import {SvgIconComponent} from "angular-svg-icon";
import {environment} from "../../../environments/environment.development";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SvgIconComponent
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public url = `${environment.SERVER_URL}/api/auth/login`;
}
