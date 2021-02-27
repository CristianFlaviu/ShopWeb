import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubconnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubconnection = new signalR.HubConnectionBuilder()
     .withUrl(environment.apiSignalR)
    .build();

    this.hubconnection
      .start()
      .then(() => console.log('WebSocket -- Connection started'))
      .catch((err) => console.log('Connection Error' + err));
  };

  public addTransferData = () => {
    this.hubconnection.on('transferData', (data) => {
      console.log(data);
      alert(data);
    });
  };
  constructor() {}

}
