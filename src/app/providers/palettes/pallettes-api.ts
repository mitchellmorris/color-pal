import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@providers/core';
import { PaletteFormModel, PaletteModel } from '@types';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PallettesApi {
  private readonly apiUrl = inject(API_URL);
  private readonly http = inject(HttpClient);
  private readonly messageService = inject(MessageService);
  
  loadPalettes$(): Observable<PaletteModel[]> {
    return this.http.get<{ 
      existingPalettes: PaletteModel[], 
      // Include any additional properties that might be returned by the API
      [key: string]: any 
    }>(`${this.apiUrl}/palettes`).pipe(
      map(response => response.existingPalettes),
      catchError(error => {
        
        return of([]); // Return an empty array on error
      })
    );
  };

  createPalette$(palette: PaletteFormModel): Observable<PaletteModel> {
    return this.http.post<{ 
      newPalette: PaletteModel,
      [key: string]: any 
    }>(`${this.apiUrl}/palette`, palette).pipe(
      map(response => response.newPalette),
      catchError(error => {
        this.messageService.add({
          severity:'error', 
          summary: 'Error!', 
          detail: 'Failed to create palette. Please try again later.'
        });
        throw error; // Rethrow the error to be handled by the caller
      })
    );
  };

  updatePalette$(palette: PaletteModel): Observable<PaletteModel> {
    return this.http.put<{ 
      existingPalette: PaletteModel,
      [key: string]: any
     }>(`${this.apiUrl}/palette/${palette.id}`, palette).pipe(
      map(response => response.existingPalette),
      catchError(error => {
        this.messageService.add({
          severity:'error', 
          summary: 'Error!', 
          detail: 'Failed to update palette. Please try again later.'
        });
        throw error; // Rethrow the error to be handled by the caller
      })
    );
  };
}
