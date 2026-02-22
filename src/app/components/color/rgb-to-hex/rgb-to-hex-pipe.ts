import { inject, Pipe, PipeTransform } from '@angular/core';
import { ColorService } from '@providers/color/color-service';
import { RGBModel } from '@types';

@Pipe({
  name: 'rgbToHex',
})
export class RgbToHexPipe implements PipeTransform {
  private colorService = inject(ColorService);
  transform(value: RGBModel): string | null {
    if (!value || value.length !== 3) return null;
    return this.colorService.rgbToHex(value);
  }

}
