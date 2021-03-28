import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserLogin } from 'src/app/data_models/authentication/user-login.model';
import { UserRegister } from 'src/app/data_models/authentication/user-register.model';
import { authCodeFlowConfig } from 'src/app/globals/auth.config';
import { CommandResult } from 'src/app/globals/commandResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthentiicationService {
  private currentUser: UserLogin;

  constructor(private oautth: OAuthService, private http: HttpClient) {}

  public async login(username: string, paswword: string): Promise<any> {
    this.oautth.configure(authCodeFlowConfig);

    // this.oautth.setupAutomaticSilentRefresh();
    return await this.oautth.fetchTokenUsingPasswordFlow(username, paswword);
  }

  public register(userRegister: UserRegister): Promise<CommandResult<any>> {
    return this.http
      .post<CommandResult<any>>(
        environment.apiUrl + '/auth/register',
        userRegister
      )
      .toPromise();
  }

  public confirmEmail(email: string, token: string): Promise<any> {
    return this.http
      .post(environment.apiUrl + '/auth/confirm-email', { email, token })
      .toPromise();
  }
  public getUser(): UserLogin {
    return this.currentUser;
  }

  public isLoggedIn(): boolean {
    return this.oautth.hasValidAccessToken();
  }

  public logout(): void {
    this.oautth.logOut();
  }
  // public refreshToken() {
  //   this.oautth.refreshToken();
  // }

  // public GetWeather() {
  //   return this.http.get('https://localhost:5001/WeatherForecast').toPromise();
  // }
}
