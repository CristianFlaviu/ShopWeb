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
        'https://localhost:5001/products/get-products-by-category/' + category
      )
      .toPromise();
  }
  
}
