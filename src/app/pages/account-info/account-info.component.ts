import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit {
  user!: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getAuthData()?.userDoc;
  }
}
