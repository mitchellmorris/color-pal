export interface PaletteModel {
  id: number;
  name: string;
  colors: number[][];
}

export interface PalettesStateModel {
  palette: PaletteModel | null;
  allPalettesLoaded: boolean;
}