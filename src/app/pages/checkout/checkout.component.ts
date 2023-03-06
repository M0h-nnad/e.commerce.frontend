import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  TokenResult,
} from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, throwError } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';
import { OrderItem } from 'src/app/types/orderLine.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: OrderItem[] = [];
  totalPrice: number = 0;
  subtotal: number = 0;

  checkoutFormGroup!: FormGroup;

  @ViewChild(StripeCardComponent, { static: true })
  card!: StripeCardComponent;

  public cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    classes: {
      base: 'py-3 px-1 border',
    },
    style: {
      base: {
        iconColor: '#666ee8',
        color: '#31325f',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '15px',
        '::placeholder': {
          color: '#aab7c4',
        },
        ':-webkit-autofill': {
          color: '#666ee8',
        },
      },
      invalid: {
        color: '#e5424d',
        ':focus': {
          color: '#303238',
        },
      },
    },
  };

  public elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly dataService: DataService,
    private readonly toastrService: ToastrService,
    private readonly userService: UserService,
    private readonly stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.dataService.getArray().subscribe({
      next: (arr) => {
        this.cart = arr;
        this.cart.forEach((obj: OrderItem) => {
          this.subtotal += (obj.item.price - obj.item.offer) * obj.quantity;
          this.totalPrice = this.subtotal;
        });
        if (this.cart && this.cart.length < 1) {
          this.toastrService.info('Your Cart is Empty');
          this.router.navigate(['/cart']);
        }
      },
    });
  }

  updateTotal(event: Event) {
    const val = (<HTMLInputElement>event.target).checked;
    if (val) {
      this.totalPrice += 10;
    } else {
      this.totalPrice -= 10;
    }
  }

  checkout() {
    this.stripeService
      .createToken(this.card.element)
      .pipe(
        switchMap((result: TokenResult) =>
          this.userService.placeAnOrder(result.token)
        ),
        catchError((err) => throwError(() => err))
      )
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['/order-success'], {
            queryParams: { orderId: res.sentObject.orderId },
          });
        },
        error: (err) => this.toastrService.error(err.error.messages),
      });
  }
}
