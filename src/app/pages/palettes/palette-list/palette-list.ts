import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPalettes } from '@state/palettes';
import { DataViewModule } from 'primeng/dataview';
import { PaletteRow } from '@components';

@Component({
  selector: 'app-palette-list',
  imports: [
    DataViewModule,
    PaletteRow,
  ],
  templateUrl: './palette-list.html',
  styleUrl: './palette-list.css',
})
export class PaletteList {
  readonly store = inject(Store);
  palettes = this.store.selectSignal(selectAllPalettes);
}
