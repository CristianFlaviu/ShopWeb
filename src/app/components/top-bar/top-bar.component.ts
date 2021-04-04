import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentiicationService } from 'src/app/data_services/authentication/authentication.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  constructor(
    public authentiicationService: AuthentiicationService,
    private router: Router
  ) {}

  ngOnInit() {}

  public logout() {
    this.authentiicationService.logout();
    this.router.navigate(['/']);
  }
}
