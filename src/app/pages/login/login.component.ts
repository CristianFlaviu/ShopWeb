import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserLogin } from 'src/app/data_models/authentication/user-login.model';
import { UserRegister } from 'src/app/data_models/authentication/user-register.model';
import { AuthentiicationService } from 'src/app/data_services/authentication/authentication.service';
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

  showSpinner = false;
  constructor(
    private singalService: SignalRService,
    private authService: AuthentiicationService,
    private snotifyService: SnotifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(): void {
    this.authService.login(this.userLogin.Email, this.userLogin.Password).then(
      (data) => {
        console.log(data);
        this.snotifyService.success('success', 'ee');
      },
      (err) => {
        console.log('hmm', err);
        this.snotifyService.error('error', 'mno');
        console.log(this.selectedTabIndex);
      }
    );
  }

  register(): void {
    if (this.form.valid) {
      if (this.registerPassword === this.confirmationPassword) {
        this.userRegister.Password = this.registerPassword;
      }
      this.authService.register(this.userRegister).then(
        () => {
          this.snotifyService.success('Succesfully Registered');
          this.form.resetForm();
          this.userRegister = new UserRegister();
          this.selectedTabIndex = 0;
        },
        (err) => {
          this.snotifyService.error('failRegister', 'mno');
          console.log(err);
        }
      );
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
