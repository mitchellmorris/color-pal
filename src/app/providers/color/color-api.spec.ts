import { TestBed } from '@angular/core/testing';

import { ColorApi } from './color-api';

describe('ColorApi', () => {
  let service: ColorApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
