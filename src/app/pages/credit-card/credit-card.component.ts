import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
})
export class CreditCardComponent implements OnInit {
  @Input() totalBill: number;

  @Output() backEvent = new EventEmitter<boolean>();
  @Output() payEvent = new EventEmitter<any>();

  public cardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snotifyService: SnotifyService
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
      this.payEvent.emit(this.cardForm.get('cardno')?.value);
    } else {
      this.snotifyService.error('Some required fields were not filled');
    }
  }

  backToShoppingCart() {
    this.backEvent.emit(false);
  }
}
