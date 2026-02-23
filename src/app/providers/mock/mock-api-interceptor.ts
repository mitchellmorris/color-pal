import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { PaletteFormModel, PaletteModel } from '@types';
import { delay, of } from 'rxjs';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Mock data for palettes
  const mockPalettes: PaletteModel[] = [
    {
      id: 123,
      name: 'Color Palette One',
      colors: [[44,43,44],[90,83,82]]
    },
    {
      id: 456,
      name: 'Color Palette Two',
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
      // simulate network latency
      delay(800)
    );
  }
  if (req.url.endsWith('/palette') && req.method === 'POST') {
    return of(
      new HttpResponse({
        status: 200,
        body: {
          // Echo back the updated palette
          newPalette: {
            id: Math.floor(Math.random() * 1000) + 1, // Simulate ID generation
            ...req.body as PaletteFormModel
          }
        }
      })
    ).pipe(
      // simulate network latency 
      delay(500)
    ); 
  }
  if (req.url.match(/\/palette\/\d+/) && req.method === 'PUT') {
    return of(
      new HttpResponse({
        status: 200,
        body: {
          // Echo back the updated palette
          existingPalette: req.body 
        }
      })
    ).pipe(
      // simulate network latency 
      delay(500)
    ); 
  }
  return next(req);
};
