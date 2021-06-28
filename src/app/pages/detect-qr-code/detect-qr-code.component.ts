import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { AuthentiicationService } from 'src/app/data_services/authentication/authentication.service';

@Component({
  selector: 'app-detect-qr-code',
  templateUrl: './detect-qr-code.component.html',
  styleUrls: ['./detect-qr-code.component.scss'],
})
export class DetectQrCodeComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  value: string;
  constructor(private authService: AuthentiicationService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    const obj = { name: user.given_name, id: user.nameid };
    this.value = JSON.stringify(obj);
  }
}
