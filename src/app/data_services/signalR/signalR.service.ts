import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { AuthentiicationService } from '../authentication/authentication.service';
import { NotificationService } from '../notification.service';
import { ProductService } from '../products/product.service';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubconnection: signalR.HubConnection;

  constructor(
    private router: Router,
    private authService: AuthentiicationService,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  public startConnection = () => {
    this.hubconnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiSignalR)
      .build();

    this.hubconnection
      .start()
      .then(() => console.log('WebSocket -- Connection started'))
      .catch((err) => console.log('Connection Error' + err));
  };

  public addTransferData = () => {
    this.hubconnection.on(
      'transferData/' + this.authService.getCurrentUser().nameid,
      (data) => {
        // this.productService.addProductToShppingCart(data).then(
        //   () => {
        //     this.notificationService.updateStats();
        //   },
        //   (err) => {
        //     console.log(err);
        //   }
        // );
        this.router.navigate(['/product-details', data]);
      }
    );
  };
}
