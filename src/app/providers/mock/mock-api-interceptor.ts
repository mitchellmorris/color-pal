import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { PaletteFormModel, PaletteModel } from '@types';
import { delay, of } from 'rxjs';
import { environment } from '@environment/environment';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
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
          existingPalettes: environment.populateMockApi ? mockPalettes : []
        }
      })
    ).pipe(
      // simulate network latency
      delay(500)
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
  if (req.url.match(/\/palette\/\d+/) && req.method === 'DELETE') {
    const match = req.url.match(/\/palette\/(\d+)/);
    const id = match ? match[1] : null;
    return of(
      new HttpResponse({
        status: 200,
        body: {
          // Echo back the deleted palette ID
          deletedId: id 
        }
      })
    ).pipe(
      // simulate network latency 
      delay(500)
    ); 
  }
  return next(req);
};
