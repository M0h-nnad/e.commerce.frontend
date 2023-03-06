import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/types/product.interface';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit, AfterViewInit {
  faArrowDown = faArrowDown;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  isBrandOpen = true;
  isColorOpen = true;
  isSizeOpen = true;
  window: any;
  isMobile = false;
  products: Product[] = [];
  pagesCount!: number;
  ArrayForIteration!: any[];
  brands: string[] = [];
  colors: string[] = [];
  size: string[] = [];
  count!: number;

  @HostListener('window:resize') Resize() {
    this.updateLayout();
  }
  constructor(
    @Inject('Window') window: Window,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.window = window;
    this.route.data.subscribe((res: any) => {
      this.products = res.subItems.SubItems;
      this.pagesCount = res.subItems.pages;
      this.count = res.subItems.count;
      this.ArrayForIteration = new Array(this.pagesCount);
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateLayout();
    }, 0);
  }
  updateLayout() {
    const width = this.window.innerWidth;
    console.log(width);
    if (width < 992) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  filterByBrand(e: any) {
    const val = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      this.brands.push(val);
    } else {
      const i = this.brands.indexOf(val);
      i > -1 ? this.brands.splice(i, 1) : '';
    }
    this.changeQueryParams();
  }

  filterByColor(e: any) {
    const val = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      this.colors.push(val);
    } else {
      const i = this.colors.indexOf(val);
      i > -1 ? this.colors.splice(i, 1) : '';
    }
    this.changeQueryParams();
  }

  filterBySize(e: any) {
    const val = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      this.size.push(val);
    } else {
      const i = this.size.indexOf(val);
      i > -1 ? this.size.splice(i, 1) : '';
    }
    this.changeQueryParams();
  }

  changeQueryParams() {
    const queryParams: Params = {
      brands: this.brands.join(','),
      colors: this.colors.join(','),
      sizes: this.size.join(','),
    };

    console.log(queryParams);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
