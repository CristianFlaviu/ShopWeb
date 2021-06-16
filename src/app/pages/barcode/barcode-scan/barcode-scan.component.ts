import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
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
  public importantFeatures: ProductAttribute[] = [];
  public products: Product[];
  public isPageInfoLoaded = false;

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
    private notificationService: NotificationService,
    private snotifyService: SnotifyService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.barcode = params['barcode'];

      await this.productService.getProductByBarcode(this.barcode + '').then(
        (data) => {
          this.product = data.payload;
          this.importantFeatures = [];

          JSON.parse(data.payload?.attributes).forEach(
            (element: ProductAttribute) => {
              if (element.IsImportant) {
                this.importantFeatures.push(element);
              }
            }
          );

          this.isPageInfoLoaded = true;
        },
        (err) => console.log(err)
      );

      this.productService
        .getProductFromSameCategory(this.product.category)
        .then(
          (data) => {
            this.products = data.payload;
          },
          (err) => {
            this.snotifyService.error(
              'An error occured, please try again later'
            );
          }
        );
    });
  }

  public async addProductToFavorite() {
    await this.productService.getProductFavorite().then(async (data) => {
      console.log('fav product', data);
      if (
        data.payload.filter((x: any) => x.barcode === this.barcode).length > 0
      ) {
        this.snotifyService.info('Product already added to favorites');
      } else {
        await this.productService.addProductToFavorite(this.barcode).then(
          (data) => {
            this.snotifyService.info('Product added to favorite');
          },
          (err) => {
            this.snotifyService.error(
              'An error occured, please try again later'
            );
          }
        );
        this.notificationService.updateStats();
      }
    });
  }

  public async addProductToShoppingCart() {
    await this.productService.getProductShoppingCart().then(async (data) => {
      console.log('add product', data);
      if (
        data.payload.filter((x: any) => x.barcode === this.barcode).length > 0
      ) {
        this.snotifyService.info('Product already added to the cart');
      } else {
        await this.productService.addProductToShppingCart(this.barcode).then(
          (data) => {
            this.snotifyService.info('Product added to the cart');
          },
          (err) => {
            this.snotifyService.error(
              'An error occured, please try again later'
            );
          }
        );
        this.notificationService.updateStats();
      }
    });
  }
}
