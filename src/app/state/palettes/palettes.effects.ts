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

  createPalette$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PalettesActions.createPalette),
      exhaustMap(action =>
        this.palettesApi.createPalette$(action.palette).pipe(
          map(createdPalette => PalettesActions.createPaletteSuccess({ palette: createdPalette })),
          catchError(error => {
            // We just return an empty observable here 
            // since the error is already handled in the API service with a message to the user.
            // EMPTY is used to indicate that the effect has completed without dispatching a new action.
            return EMPTY;
          })
        )
      )
    );
  });

  updatePalette$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PalettesActions.updatePalette),
      exhaustMap(action =>
        this.palettesApi.updatePalette$(action.palette).pipe(
          map(updatedPalette => PalettesActions.updatePaletteSuccess({ palette: updatedPalette })),
          catchError(error => {
            // We just return an empty observable here 
            // since the error is already handled in the API service with a message to the user.
            // EMPTY is used to indicate that the effect has completed without dispatching a new action.
            return EMPTY;
          })
        )
      )
    );
  });
}
