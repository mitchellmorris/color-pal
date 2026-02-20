import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectPaletteById } from '@state/palettes/palettes.selectors';
import { filter, map, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    colors: [[], Validators.required],
  });
  constructor() {
    this.palette$.subscribe(palette => {
      if (!!palette) {
        this.form.patchValue({
          name: palette.name,
          colors: palette.colors,
        });
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
