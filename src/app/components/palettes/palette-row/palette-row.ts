import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { PaletteModel } from '@types';
import { ButtonModule } from 'primeng/button';
import { RgbToHexPipe } from '@components/color';

@Component({
  selector: 'app-palette-row',
  imports: [
    ButtonModule,
    RgbToHexPipe,
  ],
  templateUrl: './palette-row.html',
  styleUrl: './palette-row.css',
})
export class PaletteRow {
  protected readonly router = inject(Router);
  palette = input.required<PaletteModel>();
}
