import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@providers/core';
import { PaletteModel } from '@types';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PallettesApi {
  private apiUrl = inject(API_URL);

  constructor(
    private http: HttpClient
  ) {}
  loadPalettes$(): Observable<PaletteModel[]> {
    return this.http.get<{ 
      existingPalettes: PaletteModel[], 
      [key: string]: any 
    }>(`${this.apiUrl}/palettes`).pipe(
      map(response => response.existingPalettes),
      catchError(error => {
        console.error('Error loading palettes:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
  updatePalette$(palette: PaletteModel): Observable<PaletteModel> {
    return this.http.put<{ 
      existingPalette: PaletteModel,
      [key: string]: any
     }>(`${this.apiUrl}/palette/${palette.id}`, palette).pipe(
      map(response => response.existingPalette),
      catchError(error => {
        console.error('Error saving palette:', error);
        throw error; // Rethrow the error to be handled by the caller
      })
    );
  }
}
