import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './globals/auth-guard';
import { BarcodeScanComponent } from './pages/barcode/barcode-scan/barcode-scan.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  {
    path: 'barcode-scan/:barcode',
    component: BarcodeScanComponent,
  },
  { path: 'shopping-cart', component: ShoppingCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
