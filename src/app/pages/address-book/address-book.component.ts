import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address/address.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandler } from 'src/app/services/error.handler';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss'],
})
export class AddressBookComponent implements OnInit {
  shippingAddressForm!: FormGroup;
  billingAddressForm!: FormGroup;
  shippingFormErrors: any = {};
  billingFormErrors: any = {};

  hasBillingAddress: boolean = false;
  hasShippingAddress: boolean = false;

  billingAddressId!: string;
  shippingAddressId!: string;

  shippingAddressIdx!: number;
  billingAddressIdx!: number;

  hasRequest: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly errorHandler: ErrorHandler,
    private readonly addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.initBillingForm();
    this.initShippingForm();
    this.errorHandler.handleErrors(
      this.shippingAddressForm,
      this.shippingFormErrors
    );
    this.errorHandler.handleErrors(
      this.billingAddressForm,
      this.billingFormErrors
    );
    this.checkAddressessAndUpdateForms();
  }

  initShippingForm() {
    this.shippingAddressForm = this.fb.group({
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['select country', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      type: ['Shipping Address'],
      isDefault: [true],
    });
  }


  initBillingForm() {
    this.billingAddressForm = this.fb.group({
      name: ['', Validators.required],
      phone2: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['select country', Validators.required],
      addressLine1: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      postalCode: ['', Validators.required],
      type: ['Billing Address'],
      isDefault: [true],
    });
  }

  checkAddressessAndUpdateForms() {
    this.route.data.subscribe({
      next: (data: any) => {
        const addresses = data.data.sentObject;
        if (addresses.length === 0) return;
        if (addresses[0].type === 'Billing Address') {
          this.billingAddressForm.patchValue(addresses[0]);
          this.billingAddressId = addresses[0].id;
          this.billingAddressIdx = 0;
          this.hasBillingAddress = true;
          if (addresses[1]) {
            this.hasShippingAddress = true;
            this.shippingAddressId = addresses[0].id;
            this.shippingAddressIdx = 1;
            this.shippingAddressForm.patchValue(addresses[1]);
          }
        } else {
          this.shippingAddressForm.patchValue(addresses[0]);
          this.shippingAddressId = addresses[0].id;
          this.shippingAddressIdx = 0;
          this.hasShippingAddress = true;
          if (addresses[1]) {
            this.hasBillingAddress = true;
            this.billingAddressIdx = 1;
            this.billingAddressId = addresses[0].id;
            this.billingAddressForm.patchValue(addresses[1]);
          }
        }
      },
      error: (err) => this.toastr.error(err.error.messages),
    });
  }


  saveShippingAddress() {
    this.hasRequest = true;
    if (!this.hasShippingAddress)
      return this.addressService
        .createAddress(this.shippingAddressForm.value)
        .subscribe({
          next: (res) => {
            this.hasRequest = false;
          },
          error: (err) => {
            this.hasRequest = false;
            this.toastr.error(err.error.messages);
          },
        });
    return this.addressService
      .updateAddress(this.shippingAddressId, this.shippingAddressForm.value)
      .subscribe({
        next: (res) => {
          this.hasRequest = false;
        },
        error: (err) => {
          this.hasRequest = false;
          this.toastr.error(err.error.messages);
        },
      });
  }

  saveBillingAddress() {
    this.hasRequest = true;
    if (!this.hasBillingAddress)
      return this.addressService
        .createAddress(this.billingAddressForm.value)
        .subscribe({
          next: (res) => {
            this.hasRequest = false;
          },
          error: (err) => {
            this.hasRequest = false;
            this.toastr.error(err.error.messages);
          },
        });

    return this.addressService
      .updateAddress(this.billingAddressId, this.billingAddressForm.value)
      .subscribe({
        next: (res) => {
          this.hasRequest = false;
        },
        error: (err) => {
          this.hasRequest = false;
          this.toastr.error(err.error.messages);
        },
      });
  }
}
