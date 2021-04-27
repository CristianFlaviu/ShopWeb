import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {


  cardForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.cardForm = this.fb.group({
      cardno: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      expDate: ['', Validators.required],
      cvvNo: ['', Validators.required]

    });

  }

  onSubmit(){
    console.log(this.cardForm.value)
  }

}
