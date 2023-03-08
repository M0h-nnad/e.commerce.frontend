import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data/data.service';
import { Transaction } from 'src/app/types/transaction.interface';
@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  transaction: Transaction = {
    orderId: '6408cb404e5c7ecafc9e740a',
    customerInfo: {
      firstName: 'Mohannd',
      lastName: 'Abdellah',
      gender: 'Male',
      phone: '+20116618826',
      email: 'super@admin.com',
      enabled: false,
      addresses: [
        {
          name: 'sd asd',
          type: 'Billing Address',
          email: 'superw@admin.com',
          isDefault: true,
          addressLine1: 'sdfad',
          country: 'egypt',
          city: 'lkopk',
          postalCode: 16720,
          state: 'okpo',
          phone2: 20116618826,
          createdAt: '2023-03-06T00:20:50.900Z',
          updatedAt: '2023-03-06T00:20:50.900Z',
          id: '640531e2dadc74af933c7d60',
        },
        {
          name: 'sd asd',
          type: 'Shipping Address',
          isDefault: true,
          addressLine1: 'sdfad',
          country: 'egypt',
          city: 'lkopk',
          postalCode: 16720,
          state: 'okpo',
          createdAt: '2023-03-06T00:20:52.904Z',
          updatedAt: '2023-03-06T00:20:52.904Z',
          id: '640531e4dadc74af933c7d65',
        },
      ],
    },
    productInfo: [
      {
        item: {
          _id: '64052541b42e784a9c68fdae',
          name: 'floral dress',
          offer: 0,
          price: 115,
        },
        variant: {
          _id: '64052541b42e784a9c68fdaf',
          color: 'black',
          src: 'images/18.jpg',
        },
        size: {
          _id: '64052541b42e784a9c68fdb0',
          number: 5,
          size: 's',
        },
        orderId: '6408cb404e5c7ecafc9e740a',
        quantity: 1,
        id: '64052541b42e784a9c68fdb0',
      },
    ],
    paymentInfo: {
      method: 'stripe',
      amount: 115,
      transactionId: 'ch_3MjPI7FEM4UHLNs01H75THFE',
    },
    shippingInfo: {
      method: 'Company shipping method',
      cost: 10,
    },
    discountInfo: 0,
    createdAt: '2023-03-08T17:53:39.983Z',
    updatedAt: '2023-03-08T17:53:39.983Z',
    __v: 0,
    id: '6408cba3a44ff28833fcfdc0',
  };
  constructor(
    private dataService: DataService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataService.getTransaction().subscribe({
      next: (transaction) => {
        if (!transaction) {
          this.toastrService.info('there is no transaction ');
          this.router.navigate(['/checkout']);
          return;
        }
        this.transaction = transaction;
      },
      error: () => {},
    });
  }
}
