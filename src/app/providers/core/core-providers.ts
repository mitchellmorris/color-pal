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
import { provideMarkdown } from 'ngx-markdown';

export const API_URL = new InjectionToken<string>('api-url');
export const CM_URL = new InjectionToken<string>('cm-url');
export const GH_URL = new InjectionToken<string>('gh-url');

export function provideCore() {
  return makeEnvironmentProviders([
    { provide: API_URL, useValue: env.apiUrl },
    { provide: CM_URL, useValue: env.cmUrl },
    { provide: GH_URL, useValue: env.ghUrl },
    MessageService,
    ConfirmationService,
    // Only provide the mock API interceptor 
    // if the mock API is enabled in the environment config.
    provideHttpClient(
      ...(
        env.useMockApi
        ? [withInterceptors([mockApiInterceptor])]
        : []
      )
    ),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(palettesFeature),
    provideEffects(PalettesEffects),
    provideMarkdown(),
    // Initialize the color mode service on app startup 
    // to apply the user's preferred theme.
    provideAppInitializer(() => {
      const colorMode = inject(ColorModeService);
      colorMode.init();
    })
  ]);
}
