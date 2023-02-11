import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginFormGroup = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    this.authService.login(this.loginFormGroup.value).subscribe({
      next: (res: any) => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        this.authService.saveAuthData(res.token, date, res.UserDoc);
        this.router.navigate(['']);
      },
      error: (err) => this.toastr.error(err.error.messages),
    });
  }
}
