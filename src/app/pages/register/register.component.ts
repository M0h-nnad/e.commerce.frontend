import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandler } from 'src/app/services/error.handler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  errors: any = {};
  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly authService: AuthService,
    private readonly errorHandler: ErrorHandler
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.pattern('[- +()0-9]+'), Validators.required]],
      gender: ['select your gender', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
    this.errorHandler.handleErrors(this.signupForm, this.errors);
  }

  signup() {
    this.authService.signup(this.signupForm.value).subscribe({
      next: (res) => this.router.navigate(['/home']),
      error: (err) => this.toastr.error(err.error.messages),
    });
  }

  getFormValidationErrors() {
    Object.keys(this.signupForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.signupForm.get(key)!
        .errors as any;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
  }
}
