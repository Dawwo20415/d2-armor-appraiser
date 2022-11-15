import { Component, OnInit } from '@angular/core';
import { ArmorItem } from '@dataTypes/storage-data.module';
import { getItems } from '@scripts/browser/storage-interface';
import { filterByQuantity, createIdString, filterByQuantityWeigthed } from '@Ibrowser/bungie-data-parsers';
import { ArmorTableUpdaterService } from '@Ibrowser/armor-table-updater.service';

@Component({
  selector: 'app-score-filter',
  templateUrl: './score-filter.component.html',
  styleUrls: ['./score-filter.component.scss']
})
export class ScoreFilterComponent implements OnInit {

  treshold: number = 0;
  DIMquery: string = "";
  to_dismantle: ArmorItem[] = [];
  armor_quantity: number = 0;
  to_dismantle_quantity: number = 0;
  adjust_by_armor_type: boolean = false;
  add_notinloadout: boolean = true;

  constructor(private table_update_service: ArmorTableUpdaterService) { }

  ngOnInit(): void {
  }

  updateTreshold(value: number | null) {
    try {
      if (value) {
        this.treshold = value;
        const dataSet = getItems();
        this.armor_quantity = dataSet.length;
        if (this.adjust_by_armor_type) {
          this.to_dismantle = filterByQuantityWeigthed(dataSet, this.treshold / 100, this.table_update_service.getCollectionInfo());
        } else {
          this.to_dismantle = filterByQuantity(dataSet, this.treshold / 100);
        }  
        this.to_dismantle_quantity = this.to_dismantle.length;
      }  
    } catch(e) {
      console.log(e);
    }  
  }

  generateQueryString() {
    if (this.add_notinloadout) {
      this.DIMquery = `not:inloadout and (${createIdString(this.to_dismantle)})`;
    } else {
      this.DIMquery = `${createIdString(this.to_dismantle)}`;
    }
  }

}
