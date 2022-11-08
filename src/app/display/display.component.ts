import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { getAuthenticationToken, getManifest, getManifestVersion, storeManifest, storeManifestVersion, storeMembership } from '@Ibrowser/storage-interface';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { BNG_AuthToken, BNG_CommonItemData } from '@dataTypes/bungie-response-data.module';
import { environment } from 'environments/environment'; 

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  isDevEnvironment = !environment.production;

  constructor(private bungie_api: BungieApiInterfaceService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.isLogged();
    await this.checkManifest();

  }

  async isLogged(): Promise<void> {
    
    let token: BNG_AuthToken;
    try {
      token = getAuthenticationToken();

      const membership$ = this.bungie_api.getMembershipInfo(token.access_token);
      const membership = await lastValueFrom(membership$);

      storeMembership(membership);
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        this.bungie_api.HandleErrorResponses(e);
      else 
        console.log(e);
    }
  }

  async checkManifest() {
    let manifest: BNG_CommonItemData;
    let manifest_version: string;
    try {
      manifest_version = getManifestVersion();

      if (manifest_version != environment.MANIFEST_COUNT) {
        manifest = await this.downloadManifest();
        manifest_version = environment.MANIFEST_COUNT

        storeManifest(manifest);
        storeManifestVersion(manifest_version);
      }
    } catch(e) {
      if (e instanceof HttpErrorResponse)
        this.bungie_api.HandleErrorResponses(e);
      else {
        console.log(e);
        storeManifestVersion('To Download');
        window.location.reload();
      }
    }
  }

  async downloadManifest(): Promise<BNG_CommonItemData> {
    let manifest: BNG_CommonItemData;

    const manifest$ = this.bungie_api.getDestinyManifest();
          manifest = await lastValueFrom(manifest$);

    return manifest;
  }
}
