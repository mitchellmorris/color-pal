import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CM_URL } from '@providers/core/core-providers';
import { RGBArrayModel } from '@types';
import { MessageService } from 'primeng/api';
import { catchError, first, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorApi {
  private readonly messageService = inject(MessageService);
  private readonly http = inject(HttpClient);
  private readonly cmUrl = inject(CM_URL);
  
  getColorSuggestions$(colors: RGBArrayModel): Observable<RGBArrayModel> {
    return this.http.post<{ result: RGBArrayModel }>(`${this.cmUrl}/`, { 
      input: [...colors],
      model: 'default',
    }).pipe(
      map(({ result }) => result),
      first(),
      catchError(error => {
        // This is a good place to use our MessageService to show an error notification to the user.
        this.messageService.add({
          severity:'error', 
          summary: 'Error!', 
          detail: 'Error fetching color suggestions. Please try again later.'
        });
        throw error; // Rethrow the error to be handled by the caller
      })
    );
  }
}
