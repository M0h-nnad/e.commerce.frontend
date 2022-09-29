import { Component, OnInit } from '@angular/core';

import {
  faArrowLeft,
  faArrowRight,
  faX,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

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
  constructor() {}

  ngOnInit(): void {}
}
