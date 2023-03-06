import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubitemsService } from 'src/app/services/subitem/subitems.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/types/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  activatedId: any = 1;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  product!: Product;
  discountPercentage!: number;
  inStock: number = 0;
  activeSize!: string;
  variantId!: string;
  sizeId!: string;
  sizeAmount: number = 0;
  ratingForm!: FormGroup;
  rate!: number;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dotsData: false,
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
    nav: false,
  };
  options: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dotsData: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 3,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: false,
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly subItemsService: SubitemsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.data.subscribe((res: any) => {
      this.product = res.subitem.subItem;
      this.discountPercentage =
        ((this.product.price - (this.product.price - this.product.offer)) *
          100) /
        this.product.price;
      this.discountPercentage = Math.ceil(this.discountPercentage);
      this.variantId = this.product.variants[0].id;
    });
  }

  onChange(e: any) {
    if (e.slides[0]) {
      this.activatedId = e.slides[0].id;
      this.variantId = e.slides[0].id;
    }
  }

  changeVariant(carousel: any, id: string) {
    carousel.to(id);
    this.variantId = id;
    this.sizeAmount = 0;
  }

  changeInStock(size: string, variantIdx: number, sizeIdx: number) {
    this.sizeAmount = 0;
    this.activeSize = size;
    this.sizeAmount = this.product.variants[variantIdx].sizes[sizeIdx].number;
    this.sizeId = this.product.variants[variantIdx].sizes[sizeIdx].id;
  }

  initForm() {
    this.ratingForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      body: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  sendRate() {
    const body = { ...this.ratingForm.value, rate: this.rate };
    this.subItemsService.rateProduct(this.product.id, body).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success(res.messages);
      },
      error: (err) => this.toastr.error(err.messages),
    });
  }

  addToCart(quantity: number) {
    if (!quantity) quantity = 1;

    this.subItemsService
      .addToCart(this.product.id, quantity, this.variantId, this.sizeId)
      .subscribe({
        next: (res: any) => {},
        error: (err) => this.toastr.error(err.error.messages),
      });
  }

  checkOut(quantity: number) {
    this.addToCart(quantity);
    this.router.navigate(['/checkout']);
  }
}
