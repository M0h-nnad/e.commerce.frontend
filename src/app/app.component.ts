import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = false;
  title = 'frontend';

  constructor(public router: Router, private authService: AuthService) {
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
    this.authService.autoAuthUser();
  }
}
