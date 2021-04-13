import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public favourite: number;
  public shoppingCart: number;

  constructor(private http: HttpClient) {}

  public updateStats() {
    this.http
      .get<any>('https://localhost:5001/products/get-shopping-cart-products')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.shoppingCart = data.payload.length;
      });
  }
}
