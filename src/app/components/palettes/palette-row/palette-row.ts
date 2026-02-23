import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { PaletteModel } from '@types';
import { ButtonModule } from 'primeng/button';
import { RgbToHexPipe } from '@components/pipes';
import { Store } from '@ngrx/store';
import { PalettesActions } from '@state/palettes';
import { ConfirmationService } from 'primeng/api';

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
  private readonly store = inject(Store);
  private readonly confirmationService = inject(ConfirmationService);
  protected readonly router = inject(Router);

  palette = input.required<PaletteModel>();

  deletePalette() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this palette?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'No, Keep',
        severity: 'success',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Yes, Delete',
        severity: 'danger',
      },
      accept: () => {
        this.store.dispatch(PalettesActions.deletePalette({ id: this.palette().id }));
      }
    });
  }
}
