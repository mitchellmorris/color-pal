import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PaletteFormModel, PaletteModel } from '@types';

export const PalettesActions = createActionGroup({
  source: 'Palettes',
  events: {
    'Load Palettes': emptyProps(),
    'Load Palettes Success': props<{ data: PaletteModel[] }>(),
    // 'Load Palettes Failure': props<{ error: unknown }>(),
    'Create Palette': props<{ palette: PaletteFormModel }>(),
    'Create Palette Success': props<{ palette: PaletteModel }>(),
    'Update Palette': props<{ palette: PaletteModel }>(),
    'Update Palette Success': props<{ palette: PaletteModel }>(),
    'Delete Palette': props<{ id: number }>(),
    'Delete Palette Success': props<{ id: number }>(),
  }
});
