import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, exhaustMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { PalettesActions } from './palettes.actions';
import { PallettesApi } from '@providers/palettes/pallettes-api';


@Injectable()
export class PalettesEffects {
  private palettesApi = inject(PallettesApi);
  private actions$ = inject(Actions);

  loadPalettes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PalettesActions.loadPalettes),
      exhaustMap(() =>
        this.palettesApi.loadPalettes$().pipe(
          map(response => PalettesActions.loadPalettesSuccess({ data: response })),
          // catchError(error => of(PalettesActions.loadPalettesFailure({ error })))
        )
      )
    );
  });
}
