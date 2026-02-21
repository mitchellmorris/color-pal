import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
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
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);
  
  paletteId = signal<number | null>(null);
  initialValue = signal<Partial<PaletteModel> | null>(null);

  palette$ = this.route.paramMap.pipe(
    map(params => Number(params.get('paletteId'))),
    filter(id => !!id),
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
        this.initialValue.set(palette);
        this.form.patchValue(palette);
      }
    });
  }

  cancel() {
    if (!!this.initialValue()) {
      this.form.reset(this.initialValue());
    } else {
      this.form.reset();
    }
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
