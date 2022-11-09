import { TestBed } from '@angular/core/testing';

import { BungieManifestService } from './bungie-manifest.service';

describe('BungieManifestService', () => {
  let service: BungieManifestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BungieManifestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
