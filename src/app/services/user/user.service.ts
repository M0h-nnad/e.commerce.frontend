import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
    return this.http
      .put(`${environment.mainUrl}${environment.updateQuantity}/${id}`, {
        quantity,
      })
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }
}
