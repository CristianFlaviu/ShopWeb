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
import { MatCardContent, MatCardModule } from '@angular/material/card';
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
import { TableModule } from 'primeng/table';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CalendarModule } from 'primeng/calendar';
import { ProgressBarModule } from 'primeng/progressbar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'primeng/carousel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RippleModule } from 'primeng/ripple';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { DividerModule } from 'primeng/divider';
import { NotificationService } from './data_services/notification.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FavoriteProductsComponent } from './pages/favorite-products/favorite-products.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { DetectQrCodeComponent } from './pages/detect-qr-code/detect-qr-code.component';
import { CreditCardComponent } from './pages/credit-card/credit-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrdersHistoryComponent } from './pages/orders-history/orders-history.component';
import { OrderHistoryDetailsComponent } from './pages/order-history-details/order-history-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './pages/confirmation-dialog/confirmation-dialog.component';
import { RedirectGuard } from './globals/redirect-guard';
const primeNgComponents = [
  CalendarModule,
  ProgressBarModule,
  ProgressBarModule,
  MultiSelectModule,
  DropdownModule,
  TableModule,
  InputTextModule,
  CardModule,
  RatingModule,
  CarouselModule,
  RippleModule,
  DividerModule,
  AutoCompleteModule,
];

const materialComponents = [
  MatMenuModule,
  MatListModule,
  MatListModule,
  MatSidenavModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatDialogModule
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    FooterComponent,
    ConfirmEmailComponent,
    HomeComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    FavoriteProductsComponent,
    DetectQrCodeComponent,
    CreditCardComponent,
    OrdersHistoryComponent,
    OrderHistoryDetailsComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgxQRCodeModule,
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    SnotifyModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.apiUrl],
        sendAccessToken: true,
      },
    }),
    primeNgComponents,
    materialComponents,
  ],
  providers: [
    { provide: OAuthStorage, useValue: localStorage },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    MatDatepickerModule,
    AuthGuard,
    NotificationService,
    RedirectGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
