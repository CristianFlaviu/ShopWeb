import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserLogin } from 'src/app/data_models/authentication/user-login.model';
import { authCodeFlowConfig } from 'src/app/globals/auth.config';

@Injectable({
  providedIn: 'root',
})
export class AuthentiicationService {
  private currentUser: UserLogin;

  constructor(private oautth: OAuthService, private http: HttpClient) {}

  public async Login(username: string, paswword: string): Promise<any> {
    this.oautth.configure(authCodeFlowConfig);

    // this.oautth.setupAutomaticSilentRefresh();

    return await this.oautth.fetchTokenUsingPasswordFlow(username, paswword);
  }

  public refreshToken() {
    this.oautth.refreshToken();
  }

  public getUser(): UserLogin {
    return this.currentUser;
  }

  public GetWeather() {
    return this.http.get('https://localhost:5001/WeatherForecast').toPromise();
  }
}
