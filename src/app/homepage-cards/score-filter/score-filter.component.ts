import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-filter',
  templateUrl: './score-filter.component.html',
  styleUrls: ['./score-filter.component.scss']
})
export class ScoreFilterComponent implements OnInit {

  treshold: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  updateTreshold(value: number | null) {
    if (value)
      this.treshold = value;
  }

}
