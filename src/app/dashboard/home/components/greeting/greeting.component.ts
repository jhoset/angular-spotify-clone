import {Component} from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [],
  templateUrl: './greeting.component.html',
})
export class GreetingComponent {
  public greeting: string = '';
  public username: string = 'Test';

  constructor() {
    this.greeting = this.getGreeting(new Date());
  }

  public getGreeting(date: Date) {
    const hours = date.getHours();
    if (hours < 12) {
      return 'Good morning'
    } else if (hours < 18) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  }
}
