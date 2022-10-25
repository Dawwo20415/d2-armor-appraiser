import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArmorTableUpdaterService {

  constructor() { }

  @Output()
  tableUpdateEvent = new EventEmitter<boolean>();

  updateTable() {
    this.tableUpdateEvent.emit(true);
  }
}
