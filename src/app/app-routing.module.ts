import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './globals/auth-guard';
import { BarcodeScanComponent } from './pages/barcode/barcode-scan/barcode-scan.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { CreditCardComponent } from './pages/credit-card/credit-card.component';
import { DetectQrCodeComponent } from './pages/detect-qr-code/detect-qr-code.component';
import { FavoriteProductsComponent } from './pages/favorite-products/favorite-products.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'barcode-scan/:barcode',
    component: BarcodeScanComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard],
  },
  { path: 'favorite-products', component: FavoriteProductsComponent },
  { path: 'detect-qr-code', component: DetectQrCodeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
