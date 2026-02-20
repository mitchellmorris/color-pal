import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { PaletteModel } from '@types';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-palette-row',
  imports: [
    ButtonModule,
  ],
  templateUrl: './palette-row.html',
  styleUrl: './palette-row.css',
})
export class PaletteRow {
  readonly router = inject(Router);
  palette = input.required<PaletteModel>();
}
