import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandler } from 'src/app/services/error.handler';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileFormGroup!: FormGroup;
  errors: any = {};
  id!: string;
  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly userService: UserService,
    private readonly errorHandler: ErrorHandler
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.errorHandler.handleErrors(this.profileFormGroup, this.errors);
  }

  initForm() {
    this.profileFormGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.email],
      ],
      gender: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  save() {
    this.userService.updateUser(this.profileFormGroup.value).subscribe({
      next: (res: any) => this.toastr.success(res.messages),
      error: (err) => this.toastr.error(err.error.messages),
    });
  }
}
