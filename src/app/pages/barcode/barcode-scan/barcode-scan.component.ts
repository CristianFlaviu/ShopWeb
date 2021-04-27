import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/data_services/notification.service';
import { ProductService } from 'src/app/data_services/products/product.service';
import { Product } from '../models/product';
import { ProductAttribute } from '../models/product-attribute';

@Component({
  selector: 'app-barcode-scan',
  templateUrl: './barcode-scan.component.html',
  styleUrls: ['./barcode-scan.component.css'],
})
export class BarcodeScanComponent implements OnInit {
  public product: Product = new Product();
  public pathToProductImage: string;

  public barcode: string;
  public imageLoading: boolean = false;

  public importantFeatures: ProductAttribute[] = [];

  public products: Product[];

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

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.barcode =
      this.activatedRoute.snapshot.paramMap.get('barcode') ?? 'invalid barcode';

    this.imageLoading = true;

    this.productService.getProductByBarcode(this.barcode + '').then(
      (data) => {
        this.product = data.payload;
        JSON.parse(data.payload?.attributes).forEach(
          (element: ProductAttribute) => {
            if (element.IsImportant) {
              this.importantFeatures.push(element);
            }
          }
        );
        this.imageLoading = false;
      },
      (err) => console.log(err)
    );

    this.productService.getProductFromSameCategory('defaultCategory').then(
      (data) => {
        console.log('list products', data.payload);
        this.products = data.payload;
      },
      (err) => console.log(err)
    );
  }

  public async addProductToFavorite() {
    await this.productService.addProductToFavorite(this.barcode).then(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    this.notificationService.updateStats();
  }

  public async addProductToShoppingCart() {
    await this.productService.addProductToShppingCart(this.barcode).then(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    this.notificationService.updateStats();
  }
  public mt() {
    console.log('ceva');
  }
}
