import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lvfAuthToken } from '@Ibungie/bungie-api-calls-library';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service'
import { getUUIDState, storeAuthenticationToken } from '@Ibrowser/storage-interface';
import { AuthenticationCheckService } from '@Ibungie/authentication-check.service';


@Component({
  selector: 'app-b-auth-redirect',
  templateUrl: './b-auth-redirect.component.html',
  styleUrls: ['./b-auth-redirect.component.scss']
})
export class BAuthRedirectComponent implements OnInit {

  constructor(private bungie_api: BungieApiInterfaceService,
              private login_service: AuthenticationCheckService, 
              private router: Router) {}

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

    storeAuthenticationToken(await lvfAuthToken(this.bungie_api, code));

    this.login_service.confirmAuthentication();
    this.router.navigate(['/']);
  }

  manualRedirect() {
    this.router.navigate(['/']);
  }
}
