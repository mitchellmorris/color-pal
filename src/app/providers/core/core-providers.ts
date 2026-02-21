import { inject, InjectionToken, isDevMode, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { environment as env } from "@environment";
import { ColorModeService } from '@providers/state/color-mode-service/color-mode-service';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MessageService, ConfirmationService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mockApiInterceptor } from '@providers/mock/mock-api-interceptor';
import { PalettesEffects, palettesFeature } from '@state/palettes';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const API_URL = new InjectionToken<string>('api-url');
export const CM_URL = new InjectionToken<string>('cm-url');

export function provideCore() {
  return makeEnvironmentProviders([
    { provide: API_URL, useValue: env.apiUrl },
    { provide: CM_URL, useValue: env.cmUrl },
    MessageService,
    ConfirmationService,
    provideHttpClient(
      ...(
        env.mockApi
        ? [withInterceptors([mockApiInterceptor])]
        : []
      )
    ),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(palettesFeature),
    provideEffects(PalettesEffects),
    provideAppInitializer(() => {
      const colorMode = inject(ColorModeService);
      colorMode.init();
    })
  ]);
}