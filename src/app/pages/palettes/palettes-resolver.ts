import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { PalettesActions } from '@state/palettes';

export const palettesResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);
  store.dispatch(PalettesActions.loadPalettes());
  return true;
};
