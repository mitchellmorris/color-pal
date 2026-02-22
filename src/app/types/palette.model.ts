export type RGBModel = [number, number, number];
export type RGBArrayModel = RGBModel[];

export interface PaletteModel {
  id: number;
  name: string;
  colors: RGBArrayModel;
}

export interface PalettesStateModel {
  palette: PaletteModel | null;
  allPalettesLoaded: boolean;
}