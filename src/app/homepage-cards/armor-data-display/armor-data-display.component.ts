import { Component, OnInit } from '@angular/core';
import { ArmorItem } from '@dataTypes/storage-data.module'

@Component({
  selector: 'app-armor-data-display',
  templateUrl: './armor-data-display.component.html',
  styleUrls: ['./armor-data-display.component.scss']
})
export class ArmorDataDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['ID','MOB','RES','REC','DIS','INT','STR','TOT','SCORE']
  armorList: ArmorItem[] = [];

}
