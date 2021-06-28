import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { NotificationService } from 'src/app/data_services/notification.service';
import { OrderService } from 'src/app/data_services/products/order.service';
import { ProductService } from 'src/app/data_services/products/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  public products: any[] = [];
  public productsPrice = 0;
  public productsPriceString: string;
  public deliveryCost = 0;

  public isCardPayment = false;

  public isPageInfoLoaded = false;
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private snotifyService: SnotifyService,
    private route: Router,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.productService.getProductShoppingCart().then((data) => {
      this.products = data.payload;
      this.isPageInfoLoaded = true;
    });
    this.computeTotalPrice();
  }

  public computeTotalPrice() {
    this.productsPrice = 0;
    this.products.forEach((x: any) => {
      this.productsPrice += x.quantity * x.newPrice;
    });

    this.productsPriceString = Number(this.productsPrice).toFixed(2);
  }

  plus(itemProduct: any) {
    if (itemProduct.quantity < itemProduct.unitsAvailable) {
      itemProduct.quantity++;
      this.productService
        .setQuantityProductShoppingCart(
          itemProduct.barcode,
          itemProduct.quantity
        )
        .then(
          () => {
            this.computeTotalPrice();
          },
          () => {
            this.snotifyService.error(
              'An error occured, please try again later'
            );
          }
        );
    }
  }

  minus(itemProduct: any) {
    if (itemProduct.quantity > 1) {
      itemProduct.quantity--;
      this.productService
        .setQuantityProductShoppingCart(
          itemProduct.barcode,
          itemProduct.quantity
        )
        .then(
          () => {
            this.computeTotalPrice();
          },
          () => {
            this.snotifyService.error(
              'An error occured, please try again later'
            );
          }
        );
    }
  }

  public async deleteProductShoppingCart(item: any) {
    this.products = this.products.filter((x) => x !== item);
    await this.productService.deleteProductToShppingCart(item?.barcode).then(
      () => {
        this.computeTotalPrice();
        this.snotifyService.info('Product deleted from shopping cart');
      },
      () => {
        this.snotifyService.error('An error occured, please try again later');
      }
    );
    this.notificationService.updateStats();
  }

  public async placeOrderLaterPayment() {
    this.orderService.placeOrderWithoutPayment().then(() => {
      this.snotifyService.success('Order has been placed');
      this.notificationService.updateStats();
      this.route.navigate(['/home']);
    });
  }

  public payOrder(cardNumber: string) {
    this.orderService.placeOrderWithPayment(cardNumber).then(
      () => {
        this.snotifyService.success('Payment Succeeded');
        this.notificationService.updateStats();
        this.route.navigate(['/home']);
      },
      () => {
        this.snotifyService.error('An error occured, please try again later');
      }
    );
  }

  public activateCardPayment() {
    this.isCardPayment = true;
  }

  public deactivateCardPayment() {
    this.isCardPayment = false;
  }
  openDialog(): void {
    const today = new Date();
    const nextWeek = new Date().setDate(today.getDate() + 7);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        total: Number(this.productsPrice).toFixed(2),
        limitDate: nextWeek,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.placeOrderLaterPayment();
      }
    });
  }
}
