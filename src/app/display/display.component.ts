import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { getAuthenticationToken, storeMembership } from '@Ibrowser/storage-interface';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { BNG_AuthToken } from '@dataTypes/bungie-response-data.module';
import { environment } from 'environments/environment'; 
import { BungieManifestService } from '@Ibungie/bungie-manifest.service';
import { lvfMembership } from '@Ibungie/bungie-api-calls-library';
import { AuthenticationCheckService } from '@Ibungie/authentication-check.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  isDevEnvironment = !environment.production;

  constructor(private bungie_api: BungieApiInterfaceService,
              private manifest_service: BungieManifestService, 
              private login_service: AuthenticationCheckService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      let token: BNG_AuthToken= getAuthenticationToken();

      const membership = await lvfMembership(this.bungie_api, token.access_token);
      storeMembership(membership);
      
      await this.manifest_service.downloadManifest();

    } catch (e) {
      //TODO Sistemare error handling
      if (e instanceof HttpErrorResponse){
        this.bungie_api.HandleErrorResponses(e);
      } else {
        console.log(e);
      }

      this.login_service.requestBungieLogin(1);
      console.log('Requesting redirect because of error in Display Component');

    } finally {
      this.login_service.BNG_loginStatus.subscribe( reason => {
        if (reason != 0)
          this.login_service.redirectToLogin(this.router, reason);
      });
    }    
  }
}
