import { Component, forwardRef, inject, signal } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RgbToHexPipe } from '@components/color/rgb-to-hex/rgb-to-hex-pipe';
import { ColorApi } from '@providers';
import { ColorService } from '@providers';
import { RGBArrayModel, RGBModel } from '@types';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-complimentary-rgb',
  templateUrl: './complimentary-rgb.html',
  styleUrl: './complimentary-rgb.css',
  imports: [
    FormsModule,
    ButtonModule,
    PopoverModule,
    RgbToHexPipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComplimentaryRgb),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ComplimentaryRgb),
      multi: true,
    }
  ],
})
export class ComplimentaryRgb {
  private colorApi = inject(ColorApi);
  readonly colorService = inject(ColorService);

  private hideTimer: any;
  activeColorIndex = signal<number>(-1);

  value = signal<RGBArrayModel>([[255, 255, 255]]);
  disabled = false;
  touched = false;
  invalid = false;

  onMouseEnter($event: MouseEvent, $index: number, panel: any) {
    clearTimeout(this.hideTimer);
    // Immediately hide the panel to reset its position if it's already open
    panel.hide(); 
    this.activeColorIndex.set($index); 
    // Use setTimeout to ensure the panel is shown 
    // after the current event loop, allowing it to position correctly
    setTimeout(() => {
      panel.show($event);
    });
  }

  onMouseLeave(panel: any) {
    // Wait 100ms before hiding to give the user time to move to the panel
    this.hideTimer = setTimeout(() => {
      this.activeColorIndex.set(-1);
      panel.hide();
    }, 500);
  }

  // If the user enters the panel, cancel the hide timer
  onPanelMouseEnter() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
  }

  private onChange = (value: RGBArrayModel) => {};
  private onTouched = () => {};

  writeValue(value: RGBArrayModel): void {
    this.value.set(value ?? [[255, 255, 255]]);
  }

  registerOnChange(fn: (value: RGBArrayModel) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  addColor(): void {
    this.markAsTouched();
    if (this.value().length >= 5) return;
    this.colorApi.addColor$(this.value()).subscribe((newColors) => {
      const newColor = newColors.pop();
      this.value.set([...this.value(), newColor!]);
      this.onChange(newColors);
    });
  }

  recalibratePalette(): void {
    this.colorApi.addColor$(this.value()).subscribe((newColors) => {
      this.value.set(newColors);
      this.onChange(newColors);
    });
  }

  recalibrateColor(index: number): void {
    console.log('Recalibrating color at index:', index);
    this.colorApi.addColor$(this.value()).subscribe((newColors) => {
      const updatedColor = newColors[index];
      const newValue = [...this.value()];
      newValue[index] = updatedColor;
      this.value.set(newValue);
      this.onChange(newValue);
    });
  }

  copyHex(color: RGBModel): void {
    const hex = this.colorService.rgbToHex(color);
    navigator.clipboard.writeText(hex).then(() => {
      console.log('Hex copied to clipboard:', hex);
    }).catch((err) => {
      console.error('Failed to copy hex:', err);
    });
  }

  removeColor(index: number): void {
    this.markAsTouched();
    const newColors = [...this.value()];
    newColors.splice(index, 1);
    this.value.set(newColors);
    this.onChange(newColors);
  }

  onUpdate(value: RGBArrayModel): void {
    this.markAsTouched();
    if (!this.disabled) {
      this.value.set(value);
      this.onChange(value);
    }
  }

  onBlur() {
    this.markAsTouched();
    this.onTouched();
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  validate(control: AbstractControl) {
    return (this.invalid = control.value.length === 0)
      ? { nonZero: true }
      : null;
  }
}
