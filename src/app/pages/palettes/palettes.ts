import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';

@Component({
  selector: 'app-palettes',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './palettes.html',
  styleUrl: './palettes.css',
})
export class Palettes {
  readonly store = inject(Store);
  readonly router = inject(Router);
  isLoading = signal(true);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
        this.isLoading.set(false);
    });
  }

}
