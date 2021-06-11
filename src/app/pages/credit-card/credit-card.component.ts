import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMMM YYYY', // this is the format showing on the input element
    monthYearLabel: 'MMMM YYYY', // this is showing on the calendar
  },
};

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CreditCardComponent implements OnInit {
  @Input() totalBill: string;

  @Output() backEvent = new EventEmitter<boolean>();
  @Output() payEvent = new EventEmitter<any>();

  public cardForm: FormGroup;
  today: Date;
  sixMonthsAgo: Date;

  constructor(
    private fb: FormBuilder,
    private snotifyService: SnotifyService
  ) {}

  ngOnInit() {
    this.today = new Date();
    this.sixMonthsAgo = new Date();
    this.sixMonthsAgo.setMonth(this.today.getMonth() - 6);

    this.cardForm = this.fb.group({
      cardno: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      expDate: ['', Validators.required],
      cvvNo: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });
  }

  get cvvNo() {
    return this.cardForm.get('cvvNo');
  }

  get firstName() {
    return this.cardForm.get('firstName');
  }
  get lastName() {
    return this.cardForm.get('lastName');
  }
  get expDate() {
    return this.cardForm.get('expDate');
  }

  payOrder() {
    console.log(this.cardForm);

    if (this.cardForm.valid) {
      this.payEvent.emit(this.cardForm.get('cardno')?.value);
    } else {
      this.snotifyService.error('Some required fields were not filled');
    }
  }

  backToShoppingCart() {
    this.backEvent.emit(false);
  }

  closeDatePicker(eventData: any, dp?: any) {
    console.log(eventData);
    console.log(eventData._i.year);

    this.expDate?.setValue(new Date(eventData._i.year,eventData._i.month));
    // get month and year from eventData and close datepicker, thus not allowing user to select date
    dp.close();
  }

  openDatePicker(dp: any) {
    dp.open();
  }
}
