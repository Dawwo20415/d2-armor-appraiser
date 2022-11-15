import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clearStorage, getAuthenticationToken, getMembership } from '@Ibrowser/storage-interface';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dev-controll-card',
  templateUrl: './dev-controll-card.component.html',
  styleUrls: ['./dev-controll-card.component.scss']
})
export class DevControllCardComponent implements OnInit {

  constructor(private router: Router,
              private bungie_api: BungieApiInterfaceService) { }

  ngOnInit(): void {
  }

  clearStorageEvent() {
    clearStorage();
  }

  simulate401() {
    this.router.navigate(['/login_request'], {queryParams: {errorCode: '401'}});
  }

  simulate500() {
    this.router.navigate(['/login_request'], {queryParams: {errorCode: '500'}});
  }

  simulate503() {
    this.router.navigate(['/login_request'], {queryParams: {errorCode: '503'}});
  }

  async dummyBungieRequest() {
    try {
      const token = getAuthenticationToken();
      const response$ = this.bungie_api.dummyGet(token.access_token);
      const response = await lastValueFrom(response$);

      console.log('Type of response is:');
      console.log(typeof(response));
    } catch(e) {
      console.log(e);
    }
  }

  async dummyBungieRequest2() {
    try {
      const token = getAuthenticationToken();
      const membership = getMembership();
      const response$ = this.bungie_api.dummyGet2(token.access_token, membership);
      const response = await lastValueFrom(response$);

      console.log('Type of response is:');
      console.log(typeof(response));
    } catch(e) {
      console.log(e);
    }
  }

}
