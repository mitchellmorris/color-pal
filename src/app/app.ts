import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingWrapper } from '@components/state';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    LoadingWrapper,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('color-pal');
}
