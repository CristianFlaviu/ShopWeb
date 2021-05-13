import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/data_services/products/product.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css'],
})
export class OrdersHistoryComponent implements OnInit {
  public cols = [
    { field: 'id', header: 'Id' },
    { field: 'orderDate', header: 'Order Date' },
    { field: 'amount', header: 'Amount' },
    { field: 'pay', header: 'IsPayed' },
  ];
  public tableData: any;
  public isPageInfoLoade = false;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getOrders().then(
      (data) => {
        this.tableData = data.payload;
        this.isPageInfoLoade = true;
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
