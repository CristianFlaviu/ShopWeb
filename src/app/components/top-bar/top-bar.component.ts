import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentiicationService } from 'src/app/data_services/authentication/authentication.service';
import { NotificationService } from 'src/app/data_services/notification.service';
import { SignalRService } from 'src/app/data_services/signalR/signalR.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  constructor(
    public authenticationService: AuthentiicationService,
    private router: Router,
    private signalService: SignalRService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.signalService.startConnection();
      this.signalService.addTransferData();
    }

    if (this.authenticationService.isLoggedIn()) {
      this.notificationService.updateStats();
    }
  }

  public logout() {
    this.notificationService.favorite = null;
    this.notificationService.shoppingCart = null;
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
  public getFav() {
    return this.notificationService.favorite;
  }

  public getShopC() {
    return this.notificationService.shoppingCart;
  }

  public navigateOnClickTitle() {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
