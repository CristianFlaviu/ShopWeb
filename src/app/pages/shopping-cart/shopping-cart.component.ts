import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor() {}

  public number = 0;
  ngOnInit() {}

  plus() {
    this.number++;
  }
  minus() {
    this.number--;
  }
}
