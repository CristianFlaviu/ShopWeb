import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Product } from 'src/app/data_models/product/product.model';

import { NotificationService } from 'src/app/data_services/notification.service';
import { ProductService } from 'src/app/data_services/products/product.service';
import { ProductAttribute } from '../../data_models/product/product-attribute.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  public product: Product = new Product();
  public productAttributes: ProductAttribute[] = [];
  public attributeCategories: string[] = [];
  public pathToProductImage: string;

  public barcode: string;
  public carouselProducts: Product[];
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
    private route: Router,
    private notificationService: NotificationService,
    private snotifyService: SnotifyService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.barcode = params['barcode'];

      await this.productService.getProductByBarcode(this.barcode + '').then(
        (data) => {
          console.log(data);
          if (data.payload == null) {
            this.route.navigate(['home']);
            this.snotifyService.error('Product not found');
          } else {
            this.product = data.payload;
            this.productAttributes = [];
            JSON.parse(data.payload?.attributes).forEach(
              (element: ProductAttribute) => {
                this.productAttributes.push(element);
                if (!this.attributeCategories.includes(element.InfoCategory)) {
                  this.attributeCategories.push(element.InfoCategory);
                }
              }
            );

            this.isPageInfoLoaded = true;
          }
        },
        () =>
          this.snotifyService.error('An error occured, please try again later')
      );

      await this.productService
        .getProductFromSameCategory(this.product.category)
        .then(
          (data) => {
            this.carouselProducts = [];
            this.carouselProducts = data.payload.filter(
              (x) => x.barcode !== this.barcode
            );
          },
          () => {
            this.snotifyService.error(
              'An error occured, please try again later'
            );
          }
        );
    });
  }

  public async addProductToFavorite() {
    await this.productService.getProductFavorite().then(async (data) => {
      if (
        data.payload.filter((x: any) => x.barcode === this.barcode).length > 0
      ) {
        this.snotifyService.info('Product already added to favorites');
      } else {
        await this.productService.addProductToFavorite(this.barcode).then(
          () => {
            this.snotifyService.info('Product added to favorites');
          },
          () => {
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
      if (
        data.payload.filter((x: any) => x.barcode === this.barcode).length > 0
      ) {
        this.snotifyService.info('Product already added to the cart');
      } else {
        await this.productService.addProductToShppingCart(this.barcode).then(
          () => {
            this.snotifyService.info('Product added to the cart');
          },
          () => {
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
