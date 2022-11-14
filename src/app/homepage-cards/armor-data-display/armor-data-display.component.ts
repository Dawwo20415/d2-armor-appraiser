import { Component, OnInit } from '@angular/core';
import { ArmorItem } from '@dataTypes/storage-data.module';
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
      this.armorList = this.manifestService.assignIcons(tmp);
      storeItems(tmp);
    } catch(e) {
      console.log(e + ' | It is probable that the armor data has not been retrieved from bungie API, please select a character to take the armor data from!');
    } 
  }

  displayedColumns: string[] = ['ICON','ID','MOB','RES','REC','DIS','INT','STR','TOT','SCORE'];

}
