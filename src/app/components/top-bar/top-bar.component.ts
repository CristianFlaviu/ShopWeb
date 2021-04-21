import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentiicationService } from 'src/app/data_services/authentication/authentication.service';
import { NotificationService } from 'src/app/data_services/notification.service';
import { ProductService } from 'src/app/data_services/products/product.service';
import { SignalRService } from 'src/app/data_services/signalR/signalR.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  

  constructor(
    public authentiicationService: AuthentiicationService,
    private router: Router,
    private singalService: SignalRService,
    private notificationService: NotificationService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.singalService.startConnection();
    this.singalService.addTransferData();

    if (this.authentiicationService.isLoggedIn()) {
      this.notificationService.updateStats();
    }
  }

  public logout() {
    this.notificationService.favourite = 0;
    this.notificationService.shoppingCart = 0;
    this.authentiicationService.logout();
    this.router.navigate(['/']);
  }
  public getFav() {
    return this.notificationService.favourite;
  }

  public getCarT() {
    return this.notificationService.shoppingCart;
  }
}
