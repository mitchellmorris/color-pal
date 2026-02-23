import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  rgbToHex([r, g, b]: number[]): string {
    return (
      '#' +
      [r, g, b]
        .map(value => value.toString(16).padStart(2, '0'))
        .join('')
    );
  } 
}
