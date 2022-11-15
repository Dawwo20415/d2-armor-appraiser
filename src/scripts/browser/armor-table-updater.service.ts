import { EventEmitter, Injectable, Output } from '@angular/core';
import { ArmorCollectionInfo } from '@dataTypes/storage-data.module';

@Injectable({
  providedIn: 'root'
})
export class ArmorTableUpdaterService {

  collection_info: ArmorCollectionInfo = {
    helmetQuantity: 0,
    glovesQuantity: 0,
    chestQuantity: 0,
    bootsQuantity: 0,
  };

  constructor() { }

  @Output()
  tableUpdateEvent = new EventEmitter<boolean>();

  updateTable() {
    this.tableUpdateEvent.emit(true);
  }

  getCollectionInfo(): ArmorCollectionInfo {
    return this.collection_info;
  }

  updateCollectionInfo(obj: ArmorCollectionInfo): void {
    this.collection_info = obj;
  }
}
