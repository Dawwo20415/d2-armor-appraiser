import { Injectable } from '@angular/core';
import { BNG_CommonItemData } from '@dataTypes/bungie-response-data.module';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BungieManifestService {

  //This data does not persist on page refresh
  //TODO add a button to refresh armor data but not the manifest
  manifest: BNG_CommonItemData | null = null;
  placeholder_icon: string = "../../../assets/example_icon.jpg";

  constructor(private bungie_api: BungieApiInterfaceService) { }

  public async downloadManifest(): Promise<void> {
    const manifest$ = this.bungie_api.getDestinyManifest();
      this.manifest = await lastValueFrom(manifest$);

    for (let key in this.manifest){
      if (!this.manifest[key].equippable) 
        delete this.manifest[key];
    } 
  }

  public manifestLookupIcon(hash: string): string {
    if (!(this.manifest === null)) {
      if (this.manifest[hash].displayProperties.hasIcon) 
        return this.manifest[hash].displayProperties.icon;
    }

    return this.placeholder_icon;
  }
}
