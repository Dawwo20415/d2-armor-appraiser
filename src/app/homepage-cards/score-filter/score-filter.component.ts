import { Component, OnInit } from '@angular/core';
import { ArmorItem } from '@dataTypes/storage-data.module';
import { getItems } from '@scripts/browser/storage-interface';
import { filterByQuantity, createIdString } from '@Ibrowser/bungie-data-parsers';

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

  constructor() { }

  ngOnInit(): void {
  }

  updateTreshold(value: number | null) {
    try {
      if (value) {
        this.treshold = value;
        const dataSet = getItems();
        this.armor_quantity = dataSet.length;
        this.to_dismantle = filterByQuantity(dataSet, this.treshold / 100);
        this.to_dismantle_quantity = this.to_dismantle.length;
      }  
    } catch(e) {
      console.log(e);
    }  
  }

  generateQueryString(value: number | null) {
    this.DIMquery = `not:inloadout and (${createIdString(this.to_dismantle)})`;  
  }

}
