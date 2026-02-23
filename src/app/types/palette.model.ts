export type RGBModel = [number, number, number];
export type RGBArrayModel = RGBModel[];

export interface PaletteModel {
  id: number;
  name: string;
  colors: RGBArrayModel;
}

export interface PaletteFormModel extends Omit<PaletteModel, 'id'> {}

export interface PalettesStateModel {
  palette: PaletteModel | null;
  allPalettesLoaded: boolean;
}