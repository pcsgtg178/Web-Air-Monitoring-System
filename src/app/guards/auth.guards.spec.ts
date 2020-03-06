import { TestBed } from '@angular/core/testing';

import { AuthGuards } from './auth.guards';

describe('Auth.Guards.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuards = TestBed.get(AuthGuards);
    expect(service).toBeTruthy();
  });
});
