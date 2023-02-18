import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit {
  user!: any;
  billingAddressIdx!: number;
  shippingAddressIdx!: number;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getAuthData()?.userDoc;
    if (this.user.addresses && this.user.addresses.length > 0) {
      this.shippingAddressIdx = this.user.addresses.findIndex(
        (a: any) => a.type === 'Shipping Address'
      );

      this.billingAddressIdx = this.user.addresses.findIndex(
        (a: any) => a.type === 'Billing Address'
      );
    }
  }
}
