import { Component, OnInit } from '@angular/core';
import { clearStorage } from '@Ibrowser/storage-interface';

@Component({
  selector: 'app-dev-controll-card',
  templateUrl: './dev-controll-card.component.html',
  styleUrls: ['./dev-controll-card.component.scss']
})
export class DevControllCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clearStorageEvent() {
    clearStorage();
  }

}
