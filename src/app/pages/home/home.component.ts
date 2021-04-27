import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/data_services/products/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  public product: any;
  public productsSuggestion: any[] = [];

  public listProducts: any[] = [];
  constructor(private route: Router, private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().then(
      (data) => {
        this.listProducts = data.payload;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public filterProducts(event: any) {
    console.log(event);
    this.productsSuggestion = [];
    this.listProducts
      .filter((x) => x.barcode.includes(event.query))
      .forEach((x) =>
        this.productsSuggestion.push({
          label: x.title,
          barcode: x.barcode,
          pathToImage: x.pathToImage,
          title: x.title,
        })
      );

  }

  public select(product: any) {
    this.route.navigateByUrl('barcode-scan/' + product.barcode);
  }
}
