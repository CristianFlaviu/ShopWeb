import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { NotificationService } from 'src/app/data_services/notification.service';
import { ProductService } from 'src/app/data_services/products/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private snotifyService: SnotifyService,
    private route: Router
  ) {}

  public products: any[] = [];
  public productsPrice = 0;
  public deliveryCost = 10;

  async ngOnInit() {
    await this.productService.getProductShoppingCart().then((data) => {
      this.products = data.payload;
    });
    this.computeTotalPrice();
  }

  public computeTotalPrice() {
    this.productsPrice = 0;
    this.products.forEach((x: any) => {
      this.productsPrice += x.quantity * x.product.newPrice;
    });
  }

  plus(itemProduct: any) {
    itemProduct.quantity++;
    this.productService
      .setQuantityProductShoppingCart(
        itemProduct.product.barcode,
        itemProduct.quantity
      )
      .then(
        () => {
          this.computeTotalPrice();
        },
        () => {
          this.snotifyService.error('An error occured, please try again later');
        }
      );
  }

  minus(itemProduct: any) {
    itemProduct.quantity--;
    this.productService
      .setQuantityProductShoppingCart(
        itemProduct.product.barcode,
        itemProduct.quantity
      )
      .then(
        () => {
          this.computeTotalPrice();
        },
        () => {
          this.snotifyService.error('An error occured, please try again later');
        }
      );
  }

  public async deleteProductShoppingCart(item: any) {
    this.products = this.products.filter((x) => x !== item);
    await this.productService
      .deleteProductToShppingCart(item?.product?.barcode)
      .then(
        () => {
          this.snotifyService.info('Prodcut deleted from shopping cart');
        },
        () => {
          this.snotifyService.error('An error occured, please try again later');
        }
      );
    this.notificationService.updateStats();
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
}
