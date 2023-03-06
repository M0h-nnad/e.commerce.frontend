import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  first,
  throwError,
  debounceTime,
  debounce,
  timer,
  delay,
  Subject,
  switchMap,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private updateQuantitySubject = new Subject<{
    id: string;
    quantity: number;
  }>();

  constructor(private readonly http: HttpClient) {}

  updateUser(body: any) {
    return this.http
      .put(`${environment.mainUrl}${environment.updateUser}`, body)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  updatePassword(body: any) {
    return this.http
      .put(`${environment.mainUrl}${environment.updatePassword}`, body)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  getWishlist() {
    return this.http
      .get(`${environment.mainUrl}${environment.getfavourite}`)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  deleteFromWishlist(id: string) {
    return this.http
      .delete(`${environment.mainUrl}${environment.deleteFromFavourite}/${id}`)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  getCart() {
    return this.http
      .get(`${environment.mainUrl}${environment.getFromCart}`)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  deleteCart(id: string) {
    return this.http
      .delete(`${environment.mainUrl}${environment.deleteFromCart}/${id}`)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  updateQuantity(id: string, quantity: number) {
    this.updateQuantitySubject.next({ id, quantity });

    return this.updateQuantitySubject.pipe(
      debounceTime(500),
      switchMap(() => {
        return this.http.put(
          `${environment.mainUrl}${environment.updateQuantity}/${id}`,
          {
            quantity,
          }
        );
      }),
      first(),
      catchError((e) => throwError(() => e))
    );
  }

  placeAnOrder(token: any) {
    return this.http
      .post(`${environment.mainUrl}${environment.createOrder}`, { token })
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }
}
