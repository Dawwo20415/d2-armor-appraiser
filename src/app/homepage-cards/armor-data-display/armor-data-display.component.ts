import { Component, OnInit } from '@angular/core';
import { ArmorCollectionInfo, ArmorItem } from '@dataTypes/storage-data.module';
import { getItems, storeItems } from '@Ibrowser/storage-interface';
import { ArmorTableUpdaterService } from '@Ibrowser/armor-table-updater.service';
import { BungieManifestService } from '@Ibungie/bungie-manifest.service';

@Component({
  selector: 'app-armor-data-display',
  templateUrl: './armor-data-display.component.html',
  styleUrls: ['./armor-data-display.component.scss']
})
export class ArmorDataDisplayComponent implements OnInit {

  armorList: ArmorItem[] = [];
  collection_info: ArmorCollectionInfo = {
    helmetQuantity: 0,
    glovesQuantity: 0,
    chestQuantity: 0,
    bootsQuantity: 0,
  };
  image_size: number = 30;

  constructor(private updateTableService: ArmorTableUpdaterService,
              private manifestService: BungieManifestService) { }

  ngOnInit(): void {
    this.updateArmor();

    //subscribing to event that sends request for tables updates
    this.updateTableService.tableUpdateEvent.subscribe((value: boolean) => {
      if (value)
        this.updateArmor();
    })
  }

  updateArmor() {
    try {
      let tmp = getItems();
      this.resetCollectionData();
      this.armorList = this.manifestService.assignIcons(tmp);
      this.gatherCollectionData(this.armorList);
      this.updateTableService.updateCollectionInfo(this.collection_info);
      storeItems(tmp);
    } catch(e) {
      console.log(e + ' | It is probable that the armor data has not been retrieved from bungie API, please select a character to take the armor data from!');
    } 
  }

  gatherCollectionData(data: ArmorItem[]): void {
    this.armorList.forEach(item => {
      switch (item.itemType) {
        case 'helmet':
          this.collection_info.helmetQuantity += 1;
          break;
        case 'gloves':
          this.collection_info.glovesQuantity += 1;
          break;
        case 'chest':
          this.collection_info.chestQuantity += 1;
          break;
        case 'boots':
          this.collection_info.bootsQuantity += 1;
          break;
        default:
          break;
      }
    });
  }

  resetCollectionData() {
    this.collection_info = {
      helmetQuantity: 0,
      glovesQuantity: 0,
      chestQuantity: 0,
      bootsQuantity: 0,
    };
  }

  displayedColumns: string[] = ['ICON','ID','MOB','RES','REC','DIS','INT','STR','TOT','SCORE'];

}
