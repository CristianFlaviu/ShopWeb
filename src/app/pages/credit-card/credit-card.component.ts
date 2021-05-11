import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { NotificationService } from 'src/app/data_services/notification.service';
import { ProductService } from 'src/app/data_services/products/product.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
})
export class CreditCardComponent implements OnInit {
  @Input() totalBill: number;

  @Output() eventChild = new EventEmitter<boolean>();
  public cardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService,
    private snotifyService: SnotifyService,
    private route: Router
  ) {}

  ngOnInit() {
    this.cardForm = this.fb.group({
      cardno: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      expDate: ['', Validators.required],
      cvvNo: ['', Validators.required],
    });
  }

  payOrder() {
    if (this.cardForm.valid) {
      this.productService
        .placeOrderWithPayment(
          this.totalBill,
          this.cardForm.get('cardno')?.value
        )
        .then(
          (data) => {
            this.snotifyService.success('Payment Succeeded');
            this.notificationService.updateStats();
            this.route.navigate(['/home']);
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.snotifyService.error('Some required fields were not filled');
    }
  }

  backToShoppingCart() {
    this.eventChild.emit(false);
  }
}
