import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from 'primeng/table';
import { ProductsService } from 'src/app/data_services/products/products.service';
import { BarcodeScan } from '../models/barcode-scan';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-barcode-scan',
  templateUrl: './barcode-scan.component.html',
  styleUrls: ['./barcode-scan.component.css'],
})
export class BarcodeScanComponent implements OnInit, AfterViewInit {
  @ViewChild('dt') table: Table;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<BarcodeScan>;
  displayedColumns: string[] = ['productName', 'barcode', 'scanDate', 'price'];

  public rating = 4;
  public columns = [
    { field: 'productName', header: 'Product Name' },
    { field: 'barcode', header: 'Barcode' },
    { field: 'scanDate', header: 'Scan-Date' },
    { field: 'quantity', header: 'Quantity' },
  ];

  public data: BarcodeScan[] = [
    {
      productName: 'lapte',
      barcode: '5012345678900',
      scanDate: 'today',
      price: 2,
    },
    {
      productName: 'branza',
      barcode: '3042345678922',
      scanDate: 'today',
      price: 10,
    },
  ];

  products: any[] = [1, 2, 3, 4, 5, 6, 7];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.productService.getAllProducts().then(
      (data) => {
        console.log(data.payload);

        console.log(JSON.parse(data.payload[0].attributes));
      },
      (err) => console.log(err)
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public mt() {
    console.log('ceva');
  }
}
