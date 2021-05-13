import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { NotificationService } from 'src/app/data_services/notification.service';
import { ProductService } from 'src/app/data_services/products/product.service';

@Component({
  selector: 'app-order-history-details',
  templateUrl: './order-history-details.component.html',
  styleUrls: ['./order-history-details.component.scss'],
})
export class OrderHistoryDetailsComponent implements OnInit {
  public products: any[] = [];
  public productsPrice = 0;
  public deliveryCost = 10;

  public isCardPayment = false;
  public order: any;
  public isPageInfoLoaded = false;

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private snotifyService: SnotifyService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;

    await this.productService.getOrderById(id).then((data) => {
      this.order = data.payload;
    });

    await this.productService.getProductsByOrderID(id).then((data) => {
      this.products = data.payload;
      this.isPageInfoLoaded = true;
    });
    this.computeTotalPrice();
  }

  public computeTotalPrice() {
    this.productsPrice = 0;
    this.products.forEach((x: any) => {
      this.productsPrice += x.quantity * x.product.newPrice;
    });
  }

  public async placeOrderLaterPayment() {
    this.productService
      .placeOrderWithoutPayment(this.productsPrice + this.deliveryCost)
      .then(() => {
        this.snotifyService.success('Order has been placed');
        this.notificationService.updateStats();
        this.route.navigate(['/home']);
      });
  }

  public activateCardPayment() {
    this.isCardPayment = true;
  }

  public deactivateCardPayment() {
    this.isCardPayment = false;
  }
}