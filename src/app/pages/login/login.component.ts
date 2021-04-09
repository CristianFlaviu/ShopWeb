import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifyService, SnotifyToast } from 'ng-snotify';
import { constants } from 'node:buffer';
import { UserLogin } from 'src/app/data_models/authentication/user-login.model';
import { UserRegister } from 'src/app/data_models/authentication/user-register.model';
import { AuthentiicationService } from 'src/app/data_services/authentication/authentication.service';
import { UserMessages } from 'src/app/globals/constants';
import { SignalRService } from '../../data_services/signalR/signalR.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  public userLogin = new UserLogin();
  public userRegister = new UserRegister();
  public registerPassword: string;
  public confirmationPassword: string;
  public selectedTabIndex = 0;

  public isError = false;
  public errorMessage: string;

  showSpinner = false;
  constructor(
    private authService: AuthentiicationService,
    private snotifyService: SnotifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(): void {
    this.authService.login(this.userLogin.Email, this.userLogin.Password).then(
      () => {
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
        switch (err.status) {
          case 401: {
            this.errorMessage = err.error;
            this.isError = true;

            this.snotifyService.error(err.error, { timeout: 5000 });
            break;
          }
          case 404: {
            this.errorMessage = UserMessages.general.serverError;
            this.isError = true;
            this.snotifyService.error(UserMessages.general.serverError, {
              timeout: 5000,
            });
          }
        }
      }
    );
  }

  register(): void {
    if (this.form.valid) {
      if (this.registerPassword === this.confirmationPassword) {
        this.userRegister.Password = this.registerPassword;
      }
      this.authService
        .register(this.userRegister)
        .then((data) => {
          if (data.isSuccess) {
            this.form.resetForm();
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

  //  this.singalService.startConnection();
  //    this.singalService.addTransferData();

  // this.authService.Login('master_user', 'Pass123456*');
  // this.authService.GetWeather().then((data) => {
  //   console.log(data);
  // });

  // this.authService.refreshToken();
  // }
}
