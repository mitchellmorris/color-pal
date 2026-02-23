import { 
  Component, 
  effect, 
  inject, 
  model, 
  output, 
  signal 
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ComplimentaryRgb } from '@components/controls';
import { PaletteFormModel, PaletteModel } from '@types';

@Component({
  selector: 'app-palette-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
    ComplimentaryRgb,
  ],
  templateUrl: './palette-form.html',
  styleUrl: './palette-form.css',
})
export class PaletteForm {
  private readonly fb = inject(FormBuilder);

  initialValue = model<PaletteFormModel | null>(null);
  isProcessed = model.required<boolean>();
  onSave = output<PaletteFormModel>();

  isSubmitting = signal(false);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    colors: [[], Validators.required],
  });

  constructor() {
    effect(() => {
      const isProcessed = this.isProcessed();
      if (isProcessed && this.isSubmitting()) {
        this.initialValue.set(this.form.value);
        this.form.markAsPristine();
        this.isProcessed.set(false);
        this.isSubmitting.set(false);
      }
    });
    effect(() => {
      const initialValue = this.initialValue();
      if (!!initialValue) {
        this.form.patchValue(initialValue);
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
    this.isSubmitting.set(true);
    this.onSave.emit(this.form.value);
  }
}

