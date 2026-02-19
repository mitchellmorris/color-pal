import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { PaletteModel } from '@types';
import { delay, of } from 'rxjs';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const mockPalettes: PaletteModel[] = [
    {
      id: 123,
      name: 'Palette One',
      colors: [[44,43,44],[90,83,82]]
    },
    {
      id: 456,
      name: 'Palette Two',
      colors: [[255,255,0],[255,0,255],[0,255,255]]
    }
  ];
  if (req.url.endsWith('/palettes') && req.method === 'GET') {
    return of(
      new HttpResponse({
        status: 200,
        body: {
          existingPalettes: mockPalettes
        }
      })
    ).pipe(
      delay(800)
    ); // simulate network latency
  }
  return next(req);
};
