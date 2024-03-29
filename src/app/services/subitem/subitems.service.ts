import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubitemsService {
  constructor(private readonly http: HttpClient) {}

  getItems(
    pageSize: number,
    currentPage: number,
    brands: string,
    colors: string,
    sizes: string
  ) {
    return this.http
      .get(
        `${environment.mainUrl}${environment.getSubitem}?pageSize=${pageSize}&&currentPage=${currentPage}&&brands=${brands}&&colors=${colors}&&sizes=${sizes}`
      )
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  getItem(id: string) {
    return this.http
      .get(`${environment.mainUrl}${environment.getSubitem}/${id}`)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  // filterItems() {}

  addToFavourite(id: string) {
    return this.http
      .post(`${environment.mainUrl}${environment.addToFavourite}/${id}`, {})
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  addToCart(
    id: string,
    quantity: number = 1,
    varaintId: string,
    sizeId: string
  ) {
    return this.http
      .post(`${environment.mainUrl}${environment.addToCart}/${id}`, {
        quantity,
        varaintId,
        sizeId,
      })
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  rateProduct(id: string, body: {}) {
    return this.http
      .post(`${environment.mainUrl}${environment.rateProduct}/${id}`, body)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }
}
