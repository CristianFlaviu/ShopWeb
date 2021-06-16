import { Injectable } from '@angular/core';
import { ProductService } from './products/product.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public favorite: number;
  public shoppingCart: number;

  constructor(private productService: ProductService) {}

  public updateStats() {
    this.productService.getProductShoppingCart().then((data) => {
      this.shoppingCart = data.payload.length;
    });

    this.productService.getProductFavorite().then((data) => {
      this.favorite = data.payload.length;
    });
  }
}
