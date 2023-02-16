import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address/address.service';
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

  hasRequest: boolean = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly errorHandler: ErrorHandler,
    private readonly addressService: AddressService,
    private readonly toastr: ToastrService
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

  saveShippingAddress() {
    this.hasRequest = true;
    this.addressService
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
  }

  saveBillingAddress() {
    this.hasRequest = true;
    this.addressService.createAddress(this.billingAddressForm.value).subscribe({
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
