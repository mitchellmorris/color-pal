import { TestBed } from '@angular/core/testing';

import { PallettesApi } from './pallettes-api';

describe('PallettesApi', () => {
  let service: PallettesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PallettesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
