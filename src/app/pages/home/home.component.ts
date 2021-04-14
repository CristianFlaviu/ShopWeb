import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public product: any;

  public productsSuggestion = [
    { label: 'Kyoto', value: 'Kyoto' },
    { label: 'Osaka', value: 'Osaka' },
    { label: 'Tokyo', value: 'Tokyo' },
    { label: 'Yokohama', value: 'Yokohama' },
  ];

  constructor(private route: Router) {}

  ngOnInit() {}

  public filterProducts(event: any) {
    this.productsSuggestion = [...this.productsSuggestion];
  }

  public select() {
    console.log('select');
    this.route.navigateByUrl('barcode-scan/0765756931180');
  }
}
