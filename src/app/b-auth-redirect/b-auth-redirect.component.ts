import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs'
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service'
import { getUUIDState, storeAuthenticationToken } from '@Ibrowser/storage-interface';


@Component({
  selector: 'app-b-auth-redirect',
  templateUrl: './b-auth-redirect.component.html',
  styleUrls: ['./b-auth-redirect.component.scss']
})
export class BAuthRedirectComponent implements OnInit {

  constructor(private bungie_api: BungieApiInterfaceService, private router: Router) {}

  async ngOnInit() {
    const query_params = new URL(window.location.href).searchParams;
    const code = query_params.get('code');
    const state: string | null = query_params.get('state');

    if (!code?.length) {
        console.log("No authorization code has been recieved from bungie");
        return;
    }

    const browserAuthState = getUUIDState();
    if (state != browserAuthState) {
        console.log("local state doesn't match one recieved from bungie");
        if (!browserAuthState || browserAuthState.length === 0) {
            console.log("In particular no state value is stored locally");
        }
        return;
    }

    const auth_token$ = this.bungie_api.getAuthToken(code);
    storeAuthenticationToken(await lastValueFrom(auth_token$));

    this.router.navigate(['/']);
  }

  manualRedirect() {
    this.router.navigate(['/']);
  }
}
