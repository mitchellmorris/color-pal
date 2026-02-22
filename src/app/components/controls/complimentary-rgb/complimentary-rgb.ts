import { Component, effect, forwardRef, inject, model, signal, viewChild } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RgbToHexPipe } from '@components/color/rgb-to-hex/rgb-to-hex-pipe';
import { ColorApi } from '@providers';
import { ColorService } from '@providers';
import { RGBArrayModel, RGBModel, RGBStructuredModel } from '@types';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { ColorPickerChangeEvent, ColorPickerModule } from 'primeng/colorpicker';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-complimentary-rgb',
  templateUrl: './complimentary-rgb.html',
  styleUrl: './complimentary-rgb.css',
  imports: [
    FormsModule,
    ButtonModule,
    PopoverModule,
    RgbToHexPipe,
    ColorPickerModule,
    TooltipModule,
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
  private readonly messageService = inject(MessageService);
  private readonly colorApi = inject(ColorApi);
  private readonly colorService = inject(ColorService);

  hidePopovrTmr: number | undefined;
  popover = viewChild<Popover>('op');
  activeColorIndex = signal<number>(-1);
  // This model is used for the color picker, 
  // which expects an object with r, g, b properties
  colorRGB = model<RGBStructuredModel>({ r: 255, g: 255, b: 255 });
  // This is the main value of the component, an array of RGB colors
  // primarily used in conjuction with requests to the ColorMind API
  value = signal<RGBArrayModel>([[255, 255, 255]]);
  tipText = signal<{ [key: string]: string }>({
    add: 'Add a new color to the palette based on the current colors',
    recalibPalette: 'Get a new set of colors based on the current palette',
    recalibColor: 'Get a new color based on the current color and the rest of the palette',
  });

  private onChange = (value: RGBArrayModel) => {};
  private onTouched = () => {};

  disabled = false;
  touched = false;
  invalid = false;

  constructor() {
    effect(() => {
      // Sync the colorRGB model with the currently active color in the value array
      const index = this.activeColorIndex();
      if (index >= 0) {
        const color = this.value()[index];
        this.colorRGB.set({ r: color[0], g: color[1], b: color[2] });
      }
    });
  }
  // This method is called when the user hovers over a color swatch
  onMouseEnter($event: MouseEvent, $index: number) {
    clearTimeout(this.hidePopovrTmr);
    // Immediately hide the panel to reset its position if it's already open
    this.popover()?.hide(); 
    // Reset the active color index to ensure the color picker closes 
    // before reopening with the new color, 
    // preventing it from getting stuck if the user quickly moves between swatches
    this.activeColorIndex.set(-1);
    // Use setTimeout to ensure the panel is shown 
    // after the current event loop, 
    // allowing the current panel.hide() to take effect and reset the position
    setTimeout(() => {
      this.activeColorIndex.set($index);
      this.popover()?.show($event);
    });
  }
  // This method is called when the user moves the mouse away from a color swatch or the panel itself
  // It sets a timer to hide the panel after a short delay, 
  // allowing the user to move to the panel without it disappearing immediately
  onMouseLeave() {
    // Wait 300ms before hiding to give the user time to move to the panel
    this.hidePopovrTmr = setTimeout(() => {
      this.activeColorIndex.set(-1);
      this.popover()?.hide();
    }, 300);
  }
  // If the user enters the panel, cancel the hide timer
  onPanelMouseEnter() {
    if (this.hidePopovrTmr) {
      clearTimeout(this.hidePopovrTmr);
    }
  }
  // This method is called when the color picker value changes
  // It updates the corresponding color in the value array 
  // and notifies Angular forms of the change
  changeColor($event: ColorPickerChangeEvent) {
    const value = $event.value as RGBStructuredModel;
    const newValue = [...this.value()];
    const index = this.activeColorIndex();
    newValue[index] = [value.r, value.g, value.b];
    this.popover()?.hide();
    this.value.set(newValue);
    this.onChange(newValue);
  }

  addColor(): void {
    this.markAsTouched();
    if (this.value().length >= 5) return;
    // Request color suggestions from the API based on the current colors,
    // and add the last (new) color to the value array
    this.colorApi.getColorSuggestions$(this.value()).subscribe((newColors) => {
      // The API returns an all new set of colors, 
      // but we only want to add the last color that was suggested
      const newColor = newColors.pop();
      this.value.set([...this.value(), newColor!]);
      this.onChange(newColors);
    });
  }
  // This method is called when the user clicks the "Recalibrate Palette" button
  // It sends the current palette to the API and replaces each swatch
  // with a slightly different color based on the API's suggestions,
  // allowing the user to explore variations of their palette while keeping the same general vibe
  recalibratePalette(): void {
    this.markAsTouched();
    this.colorApi.getColorSuggestions$(this.value()).subscribe((newColors) => {
      // The API returns a new set of colors (typically 5) based on the current palette,
      // but we want to keep the same number of colors as before, 
      // so we splice the new colors array to match the length of the current value array
      newColors.splice(this.value().length);
      this.value.set(newColors);
      this.onChange(newColors);
    });
  }
  // This method is called when the user clicks the "Recalibrate Color" button for a specific swatch
  recalibrateColor(index: number): void {
    this.markAsTouched();
    this.colorApi.getColorSuggestions$(this.value()).subscribe((newColors) => {
      // We want to update only the specific color at the given index,
      // so we take the corresponding color from the new colors array and replace it in the value array
      const updatedColor = newColors[index];
      const newValues = [...this.value()];
      newValues[index] = updatedColor;
      this.value.set(newValues);
      this.onChange(newValues);
    });
  }

  copyHex(color: RGBModel): void {
    const hex = this.colorService.rgbToHex(color);
    // Use the Clipboard API to copy the hex value to the clipboard
    // Provide user feedback on success or failure of the copy action
    navigator.clipboard.writeText(hex).then(() => {
      this.messageService.add({
        severity:'success', 
        summary: 'Copied!', 
        detail: 'Hex copied to clipboard'
      });
    }).catch((err) => {
      this.messageService.add({
        severity:'error', 
        summary: 'Error!', 
        detail: 'Failed to copy hex'
      });
    });
  }

  removeColor(index: number): void {
    this.markAsTouched();
    const newColors = [...this.value()];
    newColors.splice(index, 1);
    this.activeColorIndex.set(-1);
    this.popover()?.hide();
    this.value.set(newColors);
    this.onChange(newColors);
    this.messageService.add({
      severity:'info', 
      summary: 'Removed!', 
      detail: 'Color removed from palette'
    });
  }
  /****** Core "Bridge" Methods 👇 ******/ 
  // This method is an "Inbound" lane
  // It receives a new value from the parent form
  // and updates the component's state accordingly
  writeValue(value: RGBArrayModel): void {
    this.value.set(value ?? [[255, 255, 255]]);
  }
  // Whenever the user changes a color, we call the onChange saved function 
  // to tell Angular the value has changed, 
  // which allows the parent form to stay in sync"
  registerOnChange(fn: (value: RGBArrayModel) => void): void {
    this.onChange = fn;
  }
  // This method tells Angular the user has interacted with the control 
  // so it can show validation errors.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  /****** Internal Logic Methods 👇 ******/
  // If the parent does control.disable(), Angular calls this. 
  // Can use it to update the UI or prevent clicks.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  // These two methods ensure that the "touched" state only triggers once.
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
  /****** Internal Logic Methods 👇 ******/
  // This makes your component self-validating. 
  // Instead of the parent having to write a custom validator, 
  // your component says: "I know I'm invalid if my array is empty."
  validate(control: AbstractControl) {
    return (this.invalid = control.value.length === 0)
      ? { nonZero: true }
      : null;
  }
}
