import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandResult } from 'src/app/globals/commandResult';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  public getAllProducts(): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>('https://localhost:5001/products/get-products')
      .toPromise();
  }

  public getProductByBarcode(barcode: string): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(
        'https://localhost:5001/products/get-product-by-barcode/' + barcode
      )
      .toPromise();
  }

  public getProductFromSameCategory(
    category: string
  ): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(
        'https://localhost:5001/products/get-products-category/' + category
      )
      .toPromise();
  }

  /* Shopping Cart  */
  public addProductToShppingCart(barcode: string): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(
        'https://localhost:5001/products/add-product-shopping-cart/' + barcode
      )
      .toPromise();
  }

  public deleteProductToShppingCart(
    barcode: string
  ): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(
        'https://localhost:5001/products/delete-shopping-cart-product/' +
          barcode,
        {}
      )
      .toPromise();
  }

  public getProductShoppingCart(): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>('https://localhost:5001/products/get-shopping-cart-products')
      .toPromise();
  }
 


  /* Favorite Product */

  public addProductToFavorite(barcode: string): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(
        'https://localhost:5001/products/add-product-favorite/' + barcode
      )
      .toPromise();
  }

  public deleteProductFavorite(
    barcode: string
  ): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(
        'https://localhost:5001/products/delete-favorite-product/' +
          barcode,
        {}
      )
      .toPromise();
  }

  public getProductFavorite(): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>('https://localhost:5001/products/get-favorite-products')
      .toPromise();
  }
}
