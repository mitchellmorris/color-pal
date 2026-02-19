import { Component, input } from '@angular/core';
import { PaletteModel } from '@types';

@Component({
  selector: 'app-palette-row',
  imports: [],
  templateUrl: './palette-row.html',
  styleUrl: './palette-row.css',
})
export class PaletteRow {
  palette = input.required<PaletteModel>();
}
