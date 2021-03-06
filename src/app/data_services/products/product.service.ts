import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandResult } from 'src/app/globals/commandResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public getAllProducts(): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(environment.apiUrl + '/products/get-products')
      .toPromise();
  }

  public getProductByBarcode(barcode: string): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(
        environment.apiUrl + '/products/get-product-by-barcode/' + barcode
      )
      .toPromise();
  }

  public getProductFromSameCategory(
    category: string
  ): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(
        environment.apiUrl + '/products/get-products-category/' + category
      )
      .toPromise();
  }

  /* Shopping Cart  */
  public addProductToShppingCart(barcode: string): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(
        environment.apiUrl + '/products/add-product-shopping-cart/' + barcode
      )
      .toPromise();
  }

  public deleteProductToShppingCart(
    barcode: string
  ): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(
        environment.apiUrl +
          '/products/delete-shopping-cart-product/' +
          barcode,
        {}
      )
      .toPromise();
  }

  public getProductShoppingCart(): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(environment.apiUrl + '/products/get-shopping-cart-products')
      .toPromise();
  }

  public setQuantityProductShoppingCart(
    barcode: string,
    quantity: number
  ): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(
        environment.apiUrl + '/products/set-quantity-product-shopping-cart',
        {
          barcode,
          quantity,
        }
      )
      .toPromise();
  }

  /* Favorite Product */

  public addProductToFavorite(barcode: string): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(
        environment.apiUrl + '/products/add-product-favorite/' + barcode
      )
      .toPromise();
  }

  public deleteProductFavorite(barcode: string): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(
        environment.apiUrl + '/products/delete-favorite-product/' + barcode,
        {}
      )
      .toPromise();
  }

  public getProductFavorite(): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(environment.apiUrl + '/products/get-favorite-products')
      .toPromise();
  }

  public getProductsByOrderID(id: number): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(environment.apiUrl + '/products/get-products-by-order/' + id)
      .toPromise();
  }

  public getOrders(): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(environment.apiUrl + '/products/get-orders')
      .toPromise();
  }

  public placeOrderWithoutPayment(): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(
        environment.apiUrl + '/products/place-order-without-payment',
        {}
      )
      .toPromise();
  }

  public placeOrderLaterPayment(
    orderId: number,
    cardNumber: string
  ): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(environment.apiUrl + '/products/pay-order-later-payment', {
        orderId,
        cardNumber,
      })
      .toPromise();
  }

  public placeOrderWithPayment(
    cardNumber: string
  ): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(environment.apiUrl + '/products/pay-order-with-payment', {
        cardNumber,
      })
      .toPromise();
  }

  public getOrderById(id: number): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(environment.apiUrl + '/products/get-order-by-id/' + id)
      .toPromise();
  }
}
