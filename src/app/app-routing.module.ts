import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './globals/auth-guard';
import { RedirectGuard } from './globals/redirect-guard';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { DetectQrCodeComponent } from './pages/detect-qr-code/detect-qr-code.component';
import { FavoriteProductsComponent } from './pages/favorite-products/favorite-products.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderHistoryDetailsComponent } from './pages/order-history-details/order-history-details.component';
import { OrdersHistoryComponent } from './pages/orders-history/orders-history.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'product-details/:barcode',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favorite-products',
    component: FavoriteProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detect-qr-code',
    component: DetectQrCodeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders-history',
    component: OrdersHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders-history/:id',
    component: OrderHistoryDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'facebook',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {
      externalUrl: 'https://www.facebook.com/diaconu.calin',
    },
  },
  {
    path: 'instagram',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {
      externalUrl: 'https://www.instagram.com/ccalindiaconu',
    },
  },
  {
    path: 'twitter',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {
      externalUrl: 'https://twitter.com/elonmusk?lang=ro',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
