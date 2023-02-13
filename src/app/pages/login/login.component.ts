import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandler } from 'src/app/services/error.handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  error: any = {};

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly authService: AuthService,
    private readonly errorHandler: ErrorHandler
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.errorHandler.handleErrors(this.loginFormGroup, this.error);
  }

  initForm() {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.loginFormGroup.value).subscribe({
      next: (res: any) => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        this.authService.saveAuthData(res.token, date, res.UserDoc);
        this.authService.autoAuthUser();
        this.router.navigate(['']);
      },
      error: (err) => this.toastr.error(err.error.messages),
    });
  }
}
