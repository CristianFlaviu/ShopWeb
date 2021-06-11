import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/data_services/products/order.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css'],
})
export class OrdersHistoryComponent implements OnInit {
  public cols = [
    { field: 'id', header: 'Id' },
    { field: 'orderDate', header: 'Order date' },
    { field: 'amount', header: 'Amount' },
    { field: 'pay', header: 'Is payed' },
    { field: 'limitDate', header: 'limitDate' },
  ];
  public tableData: any;
  public isPageInfoLoade = false;
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderService.getOrders().then(
      (data) => {
        this.tableData = data.payload;

        this.tableData.forEach((order: any) => {
          order.invoiceAmount = Number(order.invoiceAmount).toFixed(2);
        });

        this.isPageInfoLoade = true;
        console.log('orders', data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onRowSelect(event: any) {
    console.log(event.data);
    this.router.navigate(['/orders-history', event.data.id]);
  }
}
