import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = false;
  title = 'frontend';

  constructor(public router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        this.isLoading = true;
      }
      if (
        ev instanceof NavigationEnd ||
        ev instanceof NavigationCancel ||
        ev instanceof NavigationError
      ) {
        this.isLoading = false;
      }
    });
  }
}
