import { Component, OnInit } from '@angular/core';
import { ArmorItem } from '@dataTypes/storage-data.module';
import { getItems } from '@scripts/browser/storage-interface';

@Component({
  selector: 'app-algorithm-parameters',
  templateUrl: './algorithm-parameters.component.html',
  styleUrls: ['./algorithm-parameters.component.scss']
})
export class AlgorithmParametersComponent implements OnInit {

  weights = {
    mob: 1,
    res: 1,
    rec: 1,
    dis: 1,
    int: 1,
    str: 1
  }

  constructor() { }

  ngOnInit(): void {
  }

  runAlgorithm() {
    const armorItems: ArmorItem[] = getItems();

    
  }
}
