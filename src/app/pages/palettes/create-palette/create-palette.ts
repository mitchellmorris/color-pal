import { Component, inject, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { PaletteForm } from '@components/forms/palette-form/palette-form';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageForwarderService } from '@providers/state/message-forwarder-service/message-forwarder-service';
import { PalettesActions } from '@state/palettes';
import { PaletteFormModel } from '@types';

@Component({
  selector: 'app-create-palette',
  imports: [
    PaletteForm
  ],
  templateUrl: './create-palette.html',
  styleUrl: './create-palette.css',
})
export class CreatePalette {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly messageForwarder = inject(MessageForwarderService);

  @ViewChild('paletteForm') childForm!: PaletteForm;

  isProcessed = signal(false);

  constructor() {
    this.actions$.pipe(
      ofType(PalettesActions.createPaletteSuccess),
      // We want this to remain active until the component is destroyed, 
      // as the user might save multiple times without leaving the page
      takeUntilDestroyed()
    ).subscribe({
      next: () => {
        this.isProcessed.set(true);
        this.messageForwarder.navigateWithMessage(['/'], {
          severity: 'success', 
          summary: 'Palette Created', 
          detail: 'The palette has been successfully created.' 
        });
      },
      error: () => {
        // The error message is already handled in the API service
        // so we don't need to show another message here.
        this.isProcessed.set(true);
      }
    });
  }

  hasUnsavedChanges(): boolean {
    if (!this.childForm) return false;
    const isSubmitting = this.childForm.isSubmitting();
    const formValue = this.childForm.form.value;
    const initialValue = this.childForm.initialValue();
    return !isSubmitting && JSON.stringify(formValue) !== JSON.stringify(initialValue);
  }

  submit(formValue: PaletteFormModel) {
    this.store.dispatch(PalettesActions.createPalette({ palette: formValue }));
  }
}
