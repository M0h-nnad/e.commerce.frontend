import { Component, Input, OnInit } from '@angular/core';
import {
  faCartShopping,
  faHeart,
  faSearch,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { SubitemsService } from 'src/app/services/subitem/subitems.service';
import { ToastrService } from 'ngx-toastr';

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
  isChanging = false;
  @Input('product') product!: any;

  mainCover!: string;

  constructor(
    private subItemsService: SubitemsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.mainCover = this.product?.variants[0].src;
  }

  changePhoto(index: number) {
    this.mainCover = this.product.variants[index].src;
  }

  addToFavourite(id: string) {
    this.subItemsService.addToFavourite(id).subscribe({
      error: (err: any) => this.toastr.error(err.error.messages),
    });
  }

  addToCart(id: string) {
    this.subItemsService.addToCart(id).subscribe({
      error: (err: any) => this.toastr.error(err.error.messages),
    });
  }
}
