import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ButtonModule } from 'primeng/button';
import { MatButtonModule } from '@angular/material/button';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './globals/auth-guard';
import { MatBadgeModule } from '@angular/material/badge';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    FooterComponent,
    ConfirmEmailComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatListModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    SnotifyModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.apiUrl],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [
    { provide: OAuthStorage, useValue: localStorage },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    MatDatepickerModule,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
