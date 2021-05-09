import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { NotificationService } from 'src/app/data_services/notification.service';
import { ProductService } from 'src/app/data_services/products/product.service';

@Component({
  selector: 'app-favorite-products',
  templateUrl: './favorite-products.component.html',
  styleUrls: ['./favorite-products.component.scss'],
})
export class FavoriteProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private snotifyService: SnotifyService
  ) {}

  public products: any[] = [];

  async ngOnInit() {
    await this.productService.getProductFavorite().then((data) => {
      this.products = data.payload;
    });
  }

  public async deleteProductShoppingCart(barcode: string) {
    this.products = this.products.filter((x) => x.product.barcode !== barcode);
    await this.productService.deleteProductFavorite(barcode).then(
      () => {
        this.notificationService.updateStats();
        this.snotifyService.info('Product deleted from favorites');
      },
      (err) => {
        this.snotifyService.error('An error occured, please try again later');
      }
    );
  }

  public async addProductToShoppingCart(barcode: string) {
    await this.productService.addProductToShppingCart(barcode).then(
      () => {
        this.snotifyService.info('Product added in the shopping cart');
        this.notificationService.updateStats();
      },
      (err) => {
        this.snotifyService.error('An error occured, please try again later');
      }
    );
  }
}
