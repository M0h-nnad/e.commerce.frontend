import { Component, OnInit } from '@angular/core';
import {
  faCartShopping,
  faHeart,
  faSearch,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  rate: number = 5;
  faCartShopping = faCartShopping;
  faHeart = faHeart;
  faSearch = faSearch;
  faRefresh = faRefresh;
  constructor() {}

  ngOnInit(): void {}
}
