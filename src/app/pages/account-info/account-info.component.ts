import { Component, OnInit } from '@angular/core';
import { addressType } from 'src/app/enum';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit {
  user!: any;
  billingAddressIdx: number = -1;
  shippingAddressIdx: number = -1;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getAuthData()?.userDoc;
    if (this.user.addresses && this.user.addresses.length > 0) {
      this.shippingAddressIdx = this.user.addresses.findIndex(
        (a: any) => a.type === addressType.shippingAddress
      );

      this.billingAddressIdx = this.user.addresses.findIndex(
        (a: any) => a.type === addressType.billingAddress
      );

    }
  }
}
