import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/types/cartItem.interface';
import { Transaction } from 'src/app/types/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cartArray = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartArray);
  private transaction!: Transaction;
  private transactionSubject = new BehaviorSubject<Transaction>(
    this.transaction
  );

  constructor() {}

  setArray(array: any) {
    this.cartArray = array;
    localStorage.setItem('cart', JSON.stringify(this.cartArray));
    this.cartSubject.next(array);
  }

  getArray() {
    return this.cartSubject.asObservable();
  }

  setTransactionArray(transaction: Transaction) {
    this.transaction = transaction;
    this.transactionSubject.next(transaction);
  }

  getTransaction() {
    return this.transactionSubject.asObservable();
  }
}
