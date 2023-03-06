import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cartArray = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartSubject = new BehaviorSubject(this.cartArray);

  constructor() {}

  setArray(array: any) {
    this.cartArray = array;
    localStorage.setItem('cart', JSON.stringify(this.cartArray));
    this.cartSubject.next(array);
  }

  getArray() {
    return this.cartSubject.asObservable();
  }
}
