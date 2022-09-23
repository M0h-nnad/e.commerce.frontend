import { Component, OnInit } from '@angular/core';
import {
  faCartShopping,
  faHeart,
  faSearch,
  faRefresh,
  faCarOn,
} from '@fortawesome/free-solid-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faCartShopping = faCartShopping;
  faHeart = faHeart;
  faSearch = faSearch;
  faRefresh = faRefresh;
  faVanShuttle = faCarOn;
  selectedIndex = 1;
  rate = 5;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
  productOptions: OwlOptions = {
    freeDrag: false,
    mouseDrag: false,
    touchDrag: false,
    dots: false,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
