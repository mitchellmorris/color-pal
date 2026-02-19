import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { palettesResolver } from './palettes-resolver';

describe('palettesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => palettesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
