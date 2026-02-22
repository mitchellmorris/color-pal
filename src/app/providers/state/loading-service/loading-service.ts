import { inject, Injectable, signal } from '@angular/core';
import { 
  GuardsCheckEnd,
  NavigationCancel,
  NavigationEnd, 
  NavigationError,
  Router 
} from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly router = inject(Router);

  loading$ = this.router.events.pipe(
    filter(
      (event) =>
        event instanceof GuardsCheckEnd ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
    ),
    map(event => {
      // Start loading ONLY after guards have finished successfully
      if (event instanceof GuardsCheckEnd) {
        // true if guards passed (or no guards) so loading should start
        return event.shouldActivate; 
      }
      // Stop loading for any completion/failure event
      return false;
    }),
    // Only emit when loading state changes to prevent flickering
    distinctUntilChanged()
  );
}
