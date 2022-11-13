import { TestBed } from '@angular/core/testing';

import { AuthenticationCheckService } from './authentication-check.service';

describe('AuthenticationCheckService', () => {
  let service: AuthenticationCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
