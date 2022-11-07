import { TestBed } from '@angular/core/testing';

import { BungieAffinitizationInterceptor } from './bungie-affinitization.interceptor';

describe('BungieAffinitizationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BungieAffinitizationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BungieAffinitizationInterceptor = TestBed.inject(BungieAffinitizationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
