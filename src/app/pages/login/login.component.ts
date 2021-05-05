import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserLogin } from 'src/app/data_models/authentication/user-login.model';
import { UserRegister } from 'src/app/data_models/authentication/user-register.model';
import { AuthentiicationService } from 'src/app/data_services/authentication/authentication.service';
import { NotificationService } from 'src/app/data_services/notification.service';
import { UserMessages } from 'src/app/globals/constants';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userLogin = new UserLogin();
  public userRegister = new UserRegister();
  public registerPassword: string;
  public confirmationPassword: string;
  public selectedTabIndex = 0;

  public isError = false;
  public errorMessage: string;

  showSpinner = false;

  registerForm = this.formbuilder.group(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumberC: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(\\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\\s|\\.|\\-)?([0-9]{3}(\\s|\\.|\\-|)){2}$'
        ),
      ]),
      emailC: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validator: ConfirmedValidator('password', 'confirmPassword'),
    }
  );

  constructor(
    private authService: AuthentiicationService,
    private snotifyService: SnotifyService,
    private router: Router,
    private notificationService: NotificationService,
    private formbuilder: FormBuilder
  ) {}

  public matcher = new MyErrorStateMatcher();

  ngOnInit() {}

  checkPasswords(group: FormGroup) {
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
  get emailC() {
    return this.registerForm.get('emailC');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumberC');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  login(): void {
    this.authService.login(this.userLogin.Email, this.userLogin.Password).then(
      () => {
        this.notificationService.updateStats();
        this.router.navigate(['/detect-qr-code']);
      },
      (err) => {
        console.log(err);
        switch (err.status) {
          case 401: {
            this.errorMessage = err.error;
            this.isError = true;
            break;
          }
          case 404: {
            this.errorMessage = UserMessages.general.serverError;
            this.isError = true;
          }
        }
      }
    );
  }

  register(): void {
    if (this.registerForm.valid) {
      this.userRegister.Email = this.emailC?.value;
      this.userRegister.Firstname = this.firstName?.value;
      this.userRegister.Lastname = this.lastName?.value;
      this.userRegister.PhoneNumber = this.phoneNumber?.value;
      this.userRegister.Password = this.password?.value;

      this.authService
        .register(this.userRegister)
        .then((data) => {
          if (data.isSuccess) {
            this.userRegister = new UserRegister();
            this.selectedTabIndex = 0;
            this.snotifyService.success(
              UserMessages.login.succesfullyRegistered
            );
          } else {
            this.snotifyService.error(data.errorMessage);
          }
        })
        .catch((err) => {
          this.snotifyService.error(UserMessages.general.serverError, {
            timeout: 5000,
          });
          console.log(err);
        });
    }
  }

  passwordContains8Characters() {
    const pass = this.password?.value;
    const touched = this.password?.dirty || this.password?.touched;
    if (touched && pass) {
      return pass.length > 8;
    }
    return null;
  }

  oneLetter() {
    const pass = this.password?.value;
    const touched = this.password?.dirty || this.password?.touched;
    if (touched && pass) {
      return /[a-zA-Z]/.test(pass);
    }
    return null;
  }

  oneNumber() {
    const pass = this.password?.value;
    const touched = this.password?.dirty || this.password?.touched;
    if (touched && pass) {
      return /\d/.test(pass);
    }
    return null;
  }
}
