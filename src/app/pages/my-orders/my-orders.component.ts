import { Component, OnInit } from '@angular/core';

import {
  faArrowLeft,
  faArrowRight,
  faX,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  faX = faX;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faCartShopping = faCartShopping;

  orders: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getOrders().subscribe({
      next: (res: any) => {
        this.orders = res.Orders;
      },
      error: () => {},
    });
  }
}
