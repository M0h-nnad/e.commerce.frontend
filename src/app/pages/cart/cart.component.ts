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
import { UserService } from 'src/app/services/user/user.service';

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
    private readonly toastr: ToastrService,
    private readonly userService: UserService
  ) {
    this.window = window;
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data: any) => {
        this.cart = data.data.sentObject;
        this.cart.forEach((obj: any) => {
          this.totalPrice += (obj.item.price - obj.item.offer) * obj.quantity;
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

  updateQuantity(operation: string, index: number, quantity: number) {
    const maxQuantity = this.cart[index].size.number;
    let updated = false;
    if (operation === '-' && quantity > 1) {
      --this.cart[index].quantity;
      updated = true;
    } else if (operation === '+' && quantity < maxQuantity) {
      ++this.cart[index].quantity;
      updated = true;
    }

    const id = this.cart[index].orderId;
    const newQuantity = this.cart[index].quantity;
    if (updated)
      this.userService
        .updateQuantity(id, newQuantity)
        .subscribe({
          next: () => {},
          error: (err) => this.toastr.error(err.error.messages),
        });
  }

  deleteItem(index: number, orderId: string) {
    this.userService.deleteCart(orderId).subscribe(() => {
      this.totalPrice -=
        this.cart[index].item.price - this.cart[index].item.offer;
      this.cart.splice(index, 1);
    });
  }
}
