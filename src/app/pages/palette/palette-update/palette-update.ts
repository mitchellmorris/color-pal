import { Component, inject, signal, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { selectPaletteById } from '@state/palettes/palettes.selectors';
import { map, switchMap, take, tap } from 'rxjs';
import { PalettesActions } from '@state/palettes/palettes.actions';
import { PaletteFormModel } from '@types';
import { Actions, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaletteForm } from '@components/forms/palette-form/palette-form';

@Component({
  selector: 'app-palette-update',
  imports: [
    PaletteForm
  ],
  templateUrl: './palette-update.html',
  styleUrl: './palette-update.css',
})
export class PaletteUpdate {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly messageService = inject(MessageService);
  // Reference the child component
  @ViewChild('paletteForm') childForm!: PaletteForm;
  
  paletteId = signal<number | null>(null);
  initialValue = signal<PaletteFormModel | null>(null);
  isProcessed = signal(false);

  palette$ = this.route.paramMap.pipe(
    map(params => Number(params.get('paletteId'))),
    // We want to get the palette data from the store
    switchMap(id => this.store.select(selectPaletteById(id!))),
    // Side effect to set the paletteId signal, 
    // which we will need when we submit the form
    // wait until we get the palette data before setting the paletteId,
    tap(palette => this.paletteId.set(palette?.id ?? null)),
    take(1),
  );

  constructor() {
    this.palette$.subscribe(palette => {
      if (!!palette) {
        const { name, colors } = palette;
        this.initialValue.set({ name, colors });
      } else {
        // If we can't find the palette, navigate to a 404 page
        // without changing the URL (skipLocationChange) 
        this.router.navigate(['/404'], { skipLocationChange: true });
      }
    });
    this.actions$.pipe(
      ofType(PalettesActions.updatePaletteSuccess),
      // We want this to remain active until the component is destroyed, 
      // as the user might save multiple times without leaving the page
      takeUntilDestroyed()
    ).subscribe({
      next: () => {
        this.isProcessed.set(true);
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Palette Updated', 
          detail: 'The palette has been successfully updated.' 
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
    if (!this.paletteId()) return;
    this.store.dispatch(PalettesActions.updatePalette({ 
      palette: {
        id: this.paletteId()!,
        ...formValue
      }
    }));
  }
}

