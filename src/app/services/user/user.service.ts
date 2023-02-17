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
}
