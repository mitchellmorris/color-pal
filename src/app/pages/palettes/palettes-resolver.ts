import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { PalettesActions, selectAllPalettes } from '@state/palettes';
import { first, map } from 'rxjs';

export const palettesResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);
  store.dispatch(PalettesActions.loadPalettes());
  return store.select(selectAllPalettes).pipe(
    map(palettes => palettes.length > 0),
    first()
  );
};
