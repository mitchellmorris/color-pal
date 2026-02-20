import { Component, effect, inject, signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectPaletteById } from '@state/palettes/palettes.selectors';
import { filter, map, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { 
  FormArray,
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { PalettesActions } from '@state/palettes/palettes.actions';

@Component({
  selector: 'app-palette-update-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
  ],
  templateUrl: './palette-update-form.html',
  styleUrl: './palette-update-form.css',
})
export class PaletteUpdateForm {
  private route = inject(ActivatedRoute);
  readonly store = inject(Store);
  readonly fb = inject(FormBuilder);
  paletteId = signal<number | null>(null);
  palette$ = this.route.paramMap.pipe(
    map(params => Number(params.get('paletteId'))),
    filter(id => id !== null),
    tap(id => this.paletteId.set(id)),
    switchMap(id => this.store.select(selectPaletteById(id!))),
    takeUntilDestroyed(),
  );
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    colors: this.fb.array([]),
  });
  constructor() {
    this.palette$.subscribe(palette => {
      if (!!palette) {
        this.form.patchValue({
          name: palette.name,
        });
        
        const colorsArr = this.form.get('colors') as FormArray;
        colorsArr.clear();
        palette.colors.forEach(color => {
          colorsArr.push(this.fb.control(color));
        });
        
        console.log('Loaded palette into form:', this.form.value);
      } else {
        // Handle case where palette is not found, e.g., navigate back or show an error
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(PalettesActions.updatePalette({ palette: {
      id: this.paletteId(),
      ...this.form.value
    }}));
  }
}
