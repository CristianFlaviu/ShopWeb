import { Injectable } from '@angular/core';
import { ProductService } from './products/product.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public favorite: number | null;
  public shoppingCart: number | null;

  constructor(private productService: ProductService) {}

  public updateStats() {
    this.productService.getProductShoppingCart().then(
      (data) => {
        this.shoppingCart = data.payload.length;
      },
      () => {
        this.shoppingCart = null;
      }
    );

    this.productService.getProductFavorite().then(
      (data) => {
        this.favorite = data.payload.length;
      },
      () => {
        this.favorite = null;
      }
    );
  }
}
