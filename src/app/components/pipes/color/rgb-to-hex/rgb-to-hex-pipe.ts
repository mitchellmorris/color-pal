import { inject, Pipe, PipeTransform } from '@angular/core';
import { ColorService } from '@providers/misc/color/color-service';
import { RGBModel } from '@types';

@Pipe({
  name: 'rgbToHex',
})
export class RgbToHexPipe implements PipeTransform {
  private colorService = inject(ColorService);
  transform(value: RGBModel): string | null {
    // r, g, and b are all required for a valid hex code
    // so if any of them are missing it's not valid.
    if (!value || value.length !== 3) return null;
    return this.colorService.rgbToHex(value);
  }

}
