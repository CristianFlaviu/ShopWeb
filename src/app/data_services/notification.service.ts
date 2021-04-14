import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsService } from './products/products.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public favourite: number;
  public shoppingCart: number;

  constructor(
    private http: HttpClient,
    private productService: ProductsService
  ) {}

  public updateStats() {
    this.productService.getProductShoppingCart().then((data) => {
      console.log(data);
      this.shoppingCart = data.payload.length;
    });

    this.productService.getProductFavorite().then((data) => {
      console.log(data);
      this.favourite = data.payload.length;
    });
  }
}
