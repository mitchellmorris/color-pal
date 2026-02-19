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
      tap(response => console.log('API response:', response)), // Debug log
      map(response => response.existingPalettes),
      catchError(error => {
        console.error('Error loading palettes:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
}
