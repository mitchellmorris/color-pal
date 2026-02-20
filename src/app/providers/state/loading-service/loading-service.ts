import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  readonly router = inject(Router);
  loading$ = this.router.events.pipe(
    filter(
      (event): event is NavigationStart | NavigationEnd =>
        event instanceof NavigationStart ||
        event instanceof NavigationEnd
    ),
    map(event => event instanceof NavigationStart)
  );
}
