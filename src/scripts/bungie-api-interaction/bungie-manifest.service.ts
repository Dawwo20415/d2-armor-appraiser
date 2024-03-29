import { Injectable } from '@angular/core';
import { BNG_CommonItemData, BNG_ManifestList } from '@dataTypes/bungie-response-data.module';
import { ArmorItem } from '@dataTypes/storage-data.module';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { lvfManifest, lvfManifestLink } from '@Ibungie/bungie-api-calls-library';

@Injectable({
  providedIn: 'root'
})
export class BungieManifestService {

  //This data does not persist on page refresh
  //TODO add a button to refresh armor data but not the manifest
  //TODO add function to automatically grab manifest link
  manifest: BNG_CommonItemData | null = null;
  placeholder_icon: string = "../../../assets/example_icon.jpg";

  constructor(private bungie_api: BungieApiInterfaceService) { }

  public async downloadManifest(): Promise<void> {

    let response = await lvfManifestLink(this.bungie_api);
    let links: BNG_ManifestList = response.Response;
    this.manifest = await lvfManifest(this.bungie_api, links.jsonWorldComponentContentPaths.en.DestinyInventoryItemLiteDefinition);

    for (let key in this.manifest){
      if (!this.manifest[key].equippable) 
        delete this.manifest[key];
    } 
  }

  public assignIcons(dataSet: ArmorItem[]): ArmorItem[] {
    dataSet.forEach(item => {
      if (item.iconPath == '')
        item.iconPath = this.manifestLookupIcon(item.itemHash);
    });

    return dataSet;
  }

  private manifestLookupIcon(hash: string): string {
    if (!(this.manifest === null)) {
      if (this.manifest[hash].displayProperties.hasIcon) 
        return this.manifest[hash].displayProperties.icon;
    }

    return this.placeholder_icon;
  }
}
