import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faArrowLeft,
  faArrowRight,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, AfterViewInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faX = faX;
  window;
  isMobile = false;
  cart!: any;
  totalPrice: number = 0;
  @HostListener('window:resize') Resize() {
    this.updateLayout();
  }
  constructor(
    @Inject('Window') window: Window,
    private readonly route: ActivatedRoute,
    private readonly toastr: ToastrService
  ) {
    this.window = window;
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data: any) => {
        this.cart = data.data.sentObject;
        this.cart.forEach((obj: any) => {
          this.totalPrice += obj.item.price - obj.item.offer;
        });
      },
      error: (err) => this.toastr.error(err.error.messages),
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateLayout();
    }, 0);
  }
  updateLayout() {
    const width = this.window.innerWidth;
    if (width < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  updateQuantity(operation: any) {}

  deleteItem(index: number) {
    this.totalPrice -=
      this.cart[index].item.price - this.cart[index].item.offer;
    this.cart.splice(index, 1);
  }
}
