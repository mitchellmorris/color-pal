import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPalettes from './palettes.reducer';

export const selectPalettesState = createFeatureSelector<fromPalettes.State>(
  fromPalettes.palettesFeatureKey
);
