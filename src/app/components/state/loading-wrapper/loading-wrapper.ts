import { Component, inject, input, signal } from '@angular/core';
import { LoadingService } from '@providers';

@Component({
  selector: 'app-loading-wrapper',
  imports: [
  ],
  templateUrl: './loading-wrapper.html',
  styleUrl: './loading-wrapper.css',
})
export class LoadingWrapper {
  readonly loadingService = inject(LoadingService);
  loadingText = input('Loading...');
  isLoading = signal(true);

  constructor() {
    this.loadingService.loading$.subscribe(isLoading => {
      this.isLoading.set(isLoading);
    });
  }
}
