import * as fromPalettes from './palettes.reducer';
import { selectPalettesState } from './palettes.selectors';

describe('Palettes Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPalettesState({
      [fromPalettes.palettesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
