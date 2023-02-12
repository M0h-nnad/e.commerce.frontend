import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, first, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth: boolean = false;
  private isAuthSubject = new BehaviorSubject<boolean>(false);
  private tokenTimer!: ReturnType<typeof setTimeout>;

  constructor(
    private readonly cookieService: CookieService,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  isAuthStatus() {
    return this.isAuth;
  }

  isAuthListener() {
    return this.isAuthSubject.asObservable();
  }

  returnToken() {
    return this.cookieService.get('token');
  }

  login(body: { email: string; password: string }) {
    return this.http
      .post(environment.mainUrl + environment.loginUser, body)
      .pipe(
        first(),
        catchError((err) => throwError(() => err))
      );
  }

  signup(body: any) {
    return this.http
      .post(environment.mainUrl + environment.signupUser, body)
      .pipe(
        first(),
        catchError((err) => throwError(() => err))
      );
  }

  updateUser(id: string, body: any) {
    return this.http
      .put(`${environment.mainUrl}${environment.updateUser}/${id}`, body)
      .pipe(
        first(),
        catchError((err) => throwError(() => err))
      );
  }

  deleteUser(id: string) {
    return this.http
      .delete(`${environment.mainUrl}${environment.updateUser}/${id}`)
      .pipe(
        first(),
        catchError((err) => throwError(() => err))
      );
  }

  saveAuthData(token: string, expirationDate: Date, userDoc: any) {
    this.cookieService.set('token', token);
    this.cookieService.set('expirationDate', expirationDate.toISOString());
    this.cookieService.set('userDoc', JSON.stringify(userDoc));
  }

  clearAuthData() {
    this.cookieService.deleteAll();
  }

  getAuthData() {
    const token = this.cookieService.get('token');
    const expirationDate = this.cookieService.get('expirationDate');
    const userCheck = this.cookieService.check('userDoc');
    const userDoc = this.cookieService.get('userDoc');

    if (!token && !expirationDate && !userCheck) {
      return;
    }

    return {
      token,
      expirationDate: new Date(expirationDate),
      userDoc: JSON.parse(userDoc),
    };
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.isAuth = true;
      this.setAuthTime(expiresIn / 1000);
      this.isAuthSubject.next(true);
    }
    return;
  }

  logout() {
    this.isAuth = false;
    this.isAuthSubject.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);
  }

  setAuthTime(durationInMin: number) {
    setTimeout(() => {
      this.logout();
    }, durationInMin * 1000);
  }
}
