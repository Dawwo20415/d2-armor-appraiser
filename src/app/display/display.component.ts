import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { getAuthenticationToken, storeMembership, storeCharacters } from '@Ibrowser/storage-interface';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { BNG_AuthToken } from '@dataTypes/bungie-response-data.module';
import { parseMembershipData } from '@scripts/browser/bungie-data-parsers';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private bungie_api: BungieApiInterfaceService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    if (!(await this.isLogged())) {
      this.router.navigate(['/login_request'])
    }

  }

  async isLogged(): Promise<boolean> {
    
    let token: BNG_AuthToken
    try {
      token = getAuthenticationToken();

      const membership$ = this.bungie_api.getMembershipInfo(token.access_token);
      const membership = await lastValueFrom(membership$);

      storeMembership(membership);
    } catch (e) {
      //There is not token saved in browser storage
      console.log(e);
      return false;
    }
    
    return true;
  }
}
