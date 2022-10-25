import { TestBed } from '@angular/core/testing';

import { ArmorTableUpdaterService } from './armor-table-updater.service';

describe('ArmorTableUpdaterService', () => {
  let service: ArmorTableUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorTableUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
