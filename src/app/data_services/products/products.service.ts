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

  public addProductToFavourite(barcode: string): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(
        'https://localhost:5001/products/add-products-to-favorite/' + barcode
      )
      .toPromise();
  }

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
}
