import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { environment as env } from "@environment";
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideCore } from '@providers';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideCore(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};

