import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { selectPaletteById } from '@state/palettes/palettes.selectors';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { PalettesActions } from '@state/palettes/palettes.actions';
import { ComplimentaryRgb } from '@components/controls';
import { PaletteModel } from '@types';
import { Actions, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-palette-update-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
    ComplimentaryRgb,
  ],
  templateUrl: './palette-update-form.html',
  styleUrl: './palette-update-form.css',
})
export class PaletteUpdateForm {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);
  private readonly actions$ = inject(Actions);
  private readonly messageService = inject(MessageService);
  
  paletteId = signal<number | null>(null);
  initialValue = signal<Partial<PaletteModel> | null>(null);
  isSubmitting = signal(false);

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

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    colors: [[], Validators.required],
  });

  constructor() {
    this.palette$.subscribe(palette => {
      if (!!palette) {
        const { name, colors } = palette;
        this.initialValue.set({ name, colors });
        this.form.patchValue({ name, colors });
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
        this.initialValue.set(this.form.value);
        this.form.markAsPristine();
        this.isSubmitting.set(false);
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Palette Updated', 
          detail: 'The palette has been successfully updated.' 
        });
      },
      error: () => {
        // The error message is already handled in the API service
        // so we don't need to show another message here.
        this.isSubmitting.set(false);
      }
    });
  }

  hasUnsavedChanges(): boolean {
    if (!this.initialValue()) return false;
    return JSON.stringify(this.form.value) !== JSON.stringify(this.initialValue());
  }

  cancel() {
    if (!!this.initialValue()) {
      this.form.reset(this.initialValue());
    } else {
      this.form.reset();
    }
  }

  submit() {
    if (this.form.invalid || !this.paletteId()) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.store.dispatch(PalettesActions.updatePalette({ 
      palette: {
        id: this.paletteId(),
        ...this.form.value
      }
    }));
  }
}

