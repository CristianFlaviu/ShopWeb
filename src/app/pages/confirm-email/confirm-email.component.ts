import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { AuthentiicationService } from 'src/app/data_services/authentication/authentication.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthentiicationService
  ) {}

  ngOnInit() {
    const email = this.route.snapshot.queryParamMap.get('email');
    const token = this.route.snapshot.queryParamMap.get('token');

    console.log(email, token);
    if (email && token) {
      this.authService.confirmEmail(email, token);
    }
  }
}
