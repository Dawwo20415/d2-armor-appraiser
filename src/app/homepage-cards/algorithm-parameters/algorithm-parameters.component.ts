import { Component, OnInit } from '@angular/core';
import { ArmorItem } from '@dataTypes/storage-data.module';
import { getItems, storeItems } from '@scripts/browser/storage-interface';
import { statDivergence_v1 } from '@algorithms/stat-divergence';
import { compareByScore } from '@Ibrowser/bungie-data-parsers';
import { ArmorTableUpdaterService } from '@Ibrowser/armor-table-updater.service';

@Component({
  selector: 'app-algorithm-parameters',
  templateUrl: './algorithm-parameters.component.html',
  styleUrls: ['./algorithm-parameters.component.scss']
})
export class AlgorithmParametersComponent implements OnInit {

  weights: Array<number> = [1,1,1,1,1,1];

  constructor(private updateTableService: ArmorTableUpdaterService) { }

  ngOnInit(): void {
  }

  updateWeights(value: number | null, index: number) {
    if (value)
      this.weights[index] = value;
  }

  runAlgorithm() {
    let armorItems: ArmorItem[] = getItems();

    armorItems = statDivergence_v1(armorItems, this.weights);
      armorItems.sort(compareByScore);

    storeItems(armorItems);

    this.updateTableService.updateTable();
  }
}
