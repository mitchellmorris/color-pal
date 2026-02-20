import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CM_URL } from '@providers/core/core-providers';
import { RGBArrayModel } from '@types';
import { catchError, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorApi {
  private cmUrl = inject(CM_URL);
  constructor(
    private http: HttpClient
  ) {}
  addColor$(colors: RGBArrayModel): Observable<RGBArrayModel> {
    const maxColors = colors.length < 5 ? colors.length : 5;
    return this.http.post<{ result: RGBArrayModel }>(`${this.cmUrl}/`, { 
      input: maxColors < 5 ? [...colors, 'N'] : [...colors],
      model: 'default',
    }).pipe(
      map(({ result }) => result.splice(0, maxColors + 1)),
      catchError(error => {
        console.error('Error adding color:', error);
        throw error; // Rethrow the error to be handled by the caller
      })
    );
  }
}
