import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { PalettesActions } from './palettes.actions';
import { PaletteModel, PalettesStateModel } from '@types';

export const palettesFeatureKey = 'palettes';

export type State = PalettesStateModel & EntityState<PaletteModel>;

export const adapter = createEntityAdapter<PaletteModel>();

export const initialState: State = adapter.getInitialState({
  palette: null,
  allPalettesLoaded: false
});

export const {
  selectAll,
  selectEntities,
} = adapter.getSelectors();

export const reducer = createReducer(
  initialState,
  on(PalettesActions.loadPalettesSuccess, (state, action) => {
    return adapter.setAll(action.data, { ...state, allPalettesLoaded: true });
  }),
  on(PalettesActions.createPaletteSuccess, (state, action) => {
    return adapter.addOne(action.palette, state);
  }),
  on(PalettesActions.updatePaletteSuccess, (state, action) => {
    return adapter.updateOne(
      { id: action.palette.id, changes: action.palette },
      state
    );
  })
);

export const palettesFeature = createFeature({
  name: palettesFeatureKey,
  reducer,
});

