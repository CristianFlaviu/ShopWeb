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

  public placeOrderWithoutPayment(amount: number): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(
        environment.apiUrl + '/products/place-order-without-payment',
        amount
      )
      .toPromise();
  }
}
