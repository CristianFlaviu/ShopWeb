import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { NotificationService } from 'src/app/data_services/notification.service';
import { OrderService } from 'src/app/data_services/products/order.service';
import { ProductService } from 'src/app/data_services/products/product.service';
import { UserMessages } from 'src/app/globals/constants';

@Component({
  selector: 'app-order-history-details',
  templateUrl: './order-history-details.component.html',
  styleUrls: ['./order-history-details.component.scss'],
})
export class OrderHistoryDetailsComponent implements OnInit {
  public products: any[] = [];
  public productsPrice: string;
  public deliveryCost = 0;

  public isCardPayment = false;
  public order: any;
  public isPageInfoLoaded = false;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private snotifyService: SnotifyService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;

    await this.orderService.getOrderById(id).then((data) => {
      if (data.isSuccess) {
        this.order = data.payload;
        this.productsPrice = Number(data.payload.invoiceAmount).toFixed(2);
      } else {
        this.snotifyService.error(UserMessages.general.serverError);
      }
    });

    await this.productService.getProductsByOrderID(id).then((data) => {
      this.products = data.payload;
      this.isPageInfoLoaded = true;
    });
  }

  public activateCardPayment() {
    this.isCardPayment = true;
  }

  public deactivateCardPayment() {
    this.isCardPayment = false;
  }

  public payOrder(cardNumber: any) {
    this.orderService
      .placeOrderLaterPayment(this.order.id, cardNumber)
      .then(() => {
        this.snotifyService.success('Succesfull Payment');
        this.notificationService.updateStats();
        this.route.navigate(['/home']);
      });
  }
}
