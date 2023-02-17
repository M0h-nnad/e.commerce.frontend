import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandler } from 'src/app/services/error.handler';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  errors: any = {};
  hasRequest: boolean = false;
  constructor(
    private fb: FormBuilder,
    private errorHandler: ErrorHandler,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.errorHandler.handleErrors(this.changePasswordForm, this.errors);
  }

  initForm() {
    this.changePasswordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchingValidatior,
      }
    );
  }

  passwordMatchingValidatior(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmNewPassword');
    return password?.value === confirmPassword?.value
      ? null
      : { passwordMismatch: true };
  }

  updatePassword() {
    this.hasRequest = true;
    this.userService.updatePassword(this.changePasswordForm.value).subscribe({
      next: (res: any) => {
        this.hasRequest = false;
        this.toastr.success(res.messages);
      },
      error: (err) => {
        this.hasRequest = false;
        this.toastr.error(err.error.messages);
      },
    });
  }
}
