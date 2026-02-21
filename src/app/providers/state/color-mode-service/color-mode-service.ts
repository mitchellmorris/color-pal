import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorModeService {
  darkMode: boolean = false;
  init() {
    const darkMode = localStorage.getItem('dark_mode');
    this.darkMode = darkMode !== null;
    if (this.darkMode) {
      const element = document.querySelector('html');
      element!.classList.add('app-dark');
    }
  }
  toggle() {
    const element = document.querySelector('html');
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      element!.classList.add('app-dark');
      localStorage.setItem('dark_mode', 'on');
    } else {
      element!.classList.remove('app-dark');
      localStorage.removeItem('dark_mode');
    }
  }
}
