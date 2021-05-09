import { Component, OnInit } from '@angular/core';
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
    private notificationService: NotificationService
  ) {}

  public products: any[] = [];

  async ngOnInit() {
    await this.productService.getProductFavorite().then((data) => {
      this.products = data.payload;
    });
  }

  public async deleteProductShoppingCart(item: any) {
    this.products = this.products.filter((x) => x !== item);
    await this.productService.deleteProductFavorite(item?.product?.barcode);

    this.notificationService.updateStats();
  }
}
