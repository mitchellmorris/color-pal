import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PalettesEffects } from './palettes.effects';

describe('PalettesEffects', () => {
  let actions$: Observable<any>;
  let effects: PalettesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PalettesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PalettesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
