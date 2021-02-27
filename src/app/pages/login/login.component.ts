import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../data_services/signalR/signalR.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public singalService: SignalRService) {}

  ngOnInit(): void {
    this.singalService.startConnection();
    this.singalService.addTransferData();

    console.log('init singalService');
  }
}
