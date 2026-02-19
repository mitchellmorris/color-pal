import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PaletteModel } from '@types';

export const PalettesActions = createActionGroup({
  source: 'Palettes',
  events: {
    'Load Palettes': emptyProps(),
    'Load Palettes Success': props<{ data: PaletteModel[] }>(),
    // 'Load Palettes Failure': props<{ error: unknown }>(),
  }
});
