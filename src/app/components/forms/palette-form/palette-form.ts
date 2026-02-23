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
import { ComplimentaryRgb } from '@components/forms/controls';
import { PaletteFormModel } from '@types';

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
  // Only the parent component will set this value, so we can assume it's required.
  isProcessed = model.required<boolean>();
  onSave = output<PaletteFormModel>();

  isSubmitting = signal(false);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    colors: [[], Validators.required],
  });

  constructor() {
    effect(() => {
      // Make a variable from the signal so that signals are easier to read and remove later
      const isProcessed = this.isProcessed();
      const isSubmitting = this.isSubmitting();
      if (isProcessed && isSubmitting) {
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
      } else {
        // We want to make sure the initialValue is in sync
        // mainly because the pending changes guard relies on it 
        // to determine if there are changes or not.
        this.initialValue.set(this.form.value);
      }
    });
  }


  hasUnsavedChanges(): boolean {
    const isSubmitting = this.isSubmitting();
    const formValue = this.form.value;
    const initialValue = this.initialValue();
    return !isSubmitting && JSON.stringify(formValue) !== JSON.stringify(initialValue);
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

