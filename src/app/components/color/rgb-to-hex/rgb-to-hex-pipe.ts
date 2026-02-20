import { inject, Pipe, PipeTransform } from '@angular/core';
import { ColorService } from '@providers/color/color-service';
import { RGBModel } from '@types';

@Pipe({
  name: 'rgbToHex',
})
export class RgbToHexPipe implements PipeTransform {
  private colorService = inject(ColorService);
  transform(value: RGBModel, ...args: unknown[]): unknown {
    if (!value || value.length !== 3) {
      return null;
    }
    const [r, g, b] = value;
    return this.colorService.rgbToHex([r, g, b]);
  }

}
