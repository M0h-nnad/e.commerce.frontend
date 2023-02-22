import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  createAddress(body: any) {
    return this.http
      .post(`${environment.mainUrl}${environment.addAddress}`, body)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  getAddress() {
    return this.http
      .get(`${environment.mainUrl}${environment.getAddress}`)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  updateAddress(id: string, body: any) {
    return this.http
      .put(`${environment.mainUrl}${environment.getAddress}/${id}`, body)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }

  deleteAddress(id: string) {
    return this.http
      .delete(`${environment.mainUrl}${environment.getAddress}/${id}`)
      .pipe(
        first(),
        catchError((e) => throwError(() => e))
      );
  }
}
