import { Component, OnInit } from '@angular/core';
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
  public userLogin = new UserLogin();
  public userRegister = new UserRegister();
  
  showSpinner = false;
  constructor(
    private singalService: SignalRService,
    private authService: AuthentiicationService,
    private snotifyService: SnotifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(): void {
    this.authService
      .Login(this.userLogin.Username, this.userLogin.Password)
      .then(
        (data) => {
          console.log(data);
          this.snotifyService.success('success', 'ee');
        },
        (err) => {
          console.log('hmm', err);
          this.snotifyService.error('error', 'mno');
        }
      )
      .catch((err) => {
        console.log('mnp', err);
        this.snotifyService.error('error', 'mno Dara');
      });
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
