import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { areAllPalettesLoaded, PalettesActions, selectAllPalettes } from '@state/palettes';
import { filter, first, map, of, switchMap } from 'rxjs';

export const palettesResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);
  return store.pipe(
    select(areAllPalettesLoaded),
    switchMap(allLoaded => {
      if (!allLoaded) {
        store.dispatch(PalettesActions.loadPalettes());
        return store.pipe(
          select(areAllPalettesLoaded),
          filter(loaded => loaded),
          first()
        );
      } else {
        return of(true);
      }
    })
  )
};
