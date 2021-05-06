import { Component, OnInit } from '@angular/core';
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
    private notificationService: NotificationService
  ) {}

  public products: any[] = [];
  public totalPrice = 0;

  async ngOnInit() {
    await this.productService.getProductShoppingCart().then((data) => {
      this.products = data.payload;
    });
    this.computeTotalPrice();
  }

  public computeTotalPrice() {
    this.totalPrice = 0;
    this.products.forEach((x: any) => {
      this.totalPrice += x.quantity * x.product.newPrice;
    });
  }

  plus(product: any) {
    product.quantity++;
    this.computeTotalPrice();
  }

  minus(product: any) {
    product.quantity--;
    this.computeTotalPrice();
  }

  public async deleteProductShoppingCart(item: any) {
    this.products = this.products.filter((x) => x !== item);
    await this.productService.deleteProductToShppingCart(
      item?.product?.barcode
    );

    this.notificationService.updateStats();
  }
}
