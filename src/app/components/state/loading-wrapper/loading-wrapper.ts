import { Component, inject, input, signal } from '@angular/core';
import { LoadingService } from '@providers';

@Component({
  selector: 'app-loading-wrapper',
  templateUrl: './loading-wrapper.html',
  styleUrl: './loading-wrapper.css',
})
export class LoadingWrapper {
  private readonly loadingService = inject(LoadingService);
  loadingText = input('Loading...');
  isLoading = signal(true);

  constructor() {
    // This remains subscribed to the loading state 
    // and updates the isLoading signal accordingly
    this.loadingService.loading$.subscribe(isLoading => {
      this.isLoading.set(isLoading);
    });
  }
}
