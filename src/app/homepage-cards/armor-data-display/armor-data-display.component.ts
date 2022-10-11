import { Component, OnInit } from '@angular/core';
import { ArmorItem } from '@dataTypes/storage-data.module';
import { getItems } from '@Ibrowser/storage-interface';

@Component({
  selector: 'app-armor-data-display',
  templateUrl: './armor-data-display.component.html',
  styleUrls: ['./armor-data-display.component.scss']
})
export class ArmorDataDisplayComponent implements OnInit {

  armorList: ArmorItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.armorList = getItems();
  }

  displayedColumns: string[] = ['ID','MOB','RES','REC','DIS','INT','STR','TOT','SCORE'];

}
