import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandResult } from 'src/app/globals/commandResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  public getOrders(): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(environment.apiUrl + '/orders/get-orders')
      .toPromise();
  }

  public getOrderById(id: number): Promise<CommandResult<any>> {
    return this.httpClient
      .get<any>(environment.apiUrl + '/orders/get-order-by-id/' + id)
      .toPromise();
  }

  public placeOrderWithoutPayment(): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(
        environment.apiUrl + '/orders/place-order-without-payment',
        {}
      )
      .toPromise();
  }

  public placeOrderWithPayment(
    cardNumber: string
  ): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(environment.apiUrl + '/orders/pay-order-with-payment', {
        cardNumber,
      })
      .toPromise();
  }

  public placeOrderLaterPayment(
    orderId: number,
    cardNumber: string
  ): Promise<CommandResult<any>> {
    return this.httpClient
      .post<any>(environment.apiUrl + '/orders/pay-order-later-payment', {
        orderId,
        cardNumber,
      })
      .toPromise();
  }
}
