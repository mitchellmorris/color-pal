import { inject, InjectionToken, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { environment as env } from "@environment";
// TODO: import { DarkMode } from '@providers/ui'; 
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MessageService, ConfirmationService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mockApiInterceptor } from '@providers';
import { PalettesEffects, palettesFeature } from '@state/palettes';

export const API_URL = new InjectionToken<string>('api-url');

export function provideCore() {
  return makeEnvironmentProviders([
    { provide: API_URL, useValue: env.apiUrl },
    MessageService,
    ConfirmationService,
    provideHttpClient(
      ...(
        env.mockApi
        ? [withInterceptors([mockApiInterceptor])]
        : []
      )
    ),
    provideState(palettesFeature),
    provideEffects(PalettesEffects),
    //TODO: provideAppInitializer(() => {
    //   const darkMode = inject(DarkMode);
    //   darkMode.init();
    // })
  ]);
}