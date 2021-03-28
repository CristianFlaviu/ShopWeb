import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthentiicationService } from '../data_services/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public auth: AuthentiicationService,
    public router: Router,
    private snotifyService: SnotifyService
  ) {}

  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.snotifyService.error('Access Denied');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
