import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { getAuthenticationToken, storeMembership } from '@Ibrowser/storage-interface';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { BNG_AuthToken } from '@dataTypes/bungie-response-data.module';
import { environment } from 'environments/environment'; 
import { BungieManifestService } from '@Ibungie/bungie-manifest.service';
import { lvfMembership } from '@Ibungie/bungie-api-calls-library';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  isDevEnvironment = !environment.production;

  constructor(private bungie_api: BungieApiInterfaceService,
              private manifest_service: BungieManifestService, 
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.isLogged();
    await this.manifest_service.downloadManifest();

  }

  async isLogged(): Promise<void> {
    
    let token: BNG_AuthToken;
    try {
      token = getAuthenticationToken();

      const membership = await lvfMembership(this.bungie_api, token.access_token);

      storeMembership(membership);
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        this.bungie_api.HandleErrorResponses(e);
      else 
        console.log(e);
    }
  }
}
