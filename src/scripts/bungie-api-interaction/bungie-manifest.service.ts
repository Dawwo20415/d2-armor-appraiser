import { Injectable } from '@angular/core';
import { BNG_CommonItemData } from '@dataTypes/bungie-response-data.module';
import { ArmorItem } from '@dataTypes/storage-data.module';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { lvfManifest } from '@Ibungie/bungie-api-calls-library';

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
    this.manifest = await lvfManifest(this.bungie_api);

    for (let key in this.manifest){
      if (!this.manifest[key].equippable) 
        delete this.manifest[key];
    } 
  }

  public assignIcons(dataSet: ArmorItem[]): ArmorItem[] {
    dataSet.forEach(item => {
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
