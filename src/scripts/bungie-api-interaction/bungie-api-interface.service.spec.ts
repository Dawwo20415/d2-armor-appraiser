import { TestBed } from '@angular/core/testing';

import { BungieApiInterfaceService } from './bungie-api-interface.service';

describe('BungieApiInterfaceService', () => {
  let service: BungieApiInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BungieApiInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
