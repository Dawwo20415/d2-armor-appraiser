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

  constructor() { }

  ngOnInit(): void {
  }

  updateTreshold(value: number | null) {
    if (value)
      this.treshold = value;
  }

  generateQueryString(value: number | null) {
    try {
      const dataSet = getItems();

      let armor_to_delete: ArmorItem[] = filterByQuantity(dataSet, this.treshold / 100);
      this.DIMquery = `not:inloadout and (${createIdString(armor_to_delete)})`;
    } catch(e) {
      console.log(e);
    }
    
  }

}
