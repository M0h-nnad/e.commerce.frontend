import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faArrowLeft,
  faArrowRight,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';
import { CartItem } from 'src/app/types/cartItem.interface';
import { debounce, Subject } from 'rxjs';

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
  cart!: CartItem[];
  totalPrice: number = 0;

  updateQuantitySubject = new Subject();

  @HostListener('window:resize') Resize() {
    this.updateLayout();
  }
  constructor(
    private readonly router: Router,
    @Inject('Window') window: Window,
    private readonly route: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly userService: UserService,
    private readonly dataService: DataService
  ) {
    this.window = window;
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data: any) => {
        this.cart = data.data.sentObject;
        this.dataService.setArray(this.cart);
        this.totalPrice = this.cart.reduce((total: number, obj: CartItem) => {
          const itemPrice = obj.item.price - obj.item.offer;
          return total + itemPrice * obj.quantity;
        }, 0);
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
      this.userService.updateQuantity(id, newQuantity).subscribe({
        next: () => {
          this.dataService.setArray(this.cart);
        },
        error: (err) => this.toastr.error(err.error.messages),
      });
  }

  deleteItem(index: number, orderId: string) {
    this.userService.deleteCart(orderId).subscribe(() => {
      this.totalPrice -=
        this.cart[index].item.price - this.cart[index].item.offer;
      this.cart.splice(index, 1);
      this.dataService.setArray(this.cart);
    });
  }
}
