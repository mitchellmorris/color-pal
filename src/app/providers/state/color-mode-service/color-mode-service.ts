import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorModeService {

  darkMode: boolean = true;
  init() {
    const darkMode = localStorage.getItem('dark_mode');
    const element = document.querySelector('html');
    const isDark = element!.classList.contains('dark');
    this.darkMode = darkMode !== null || isDark;
    if (this.darkMode) {
      element!.classList.add('app-dark');
      localStorage.setItem('dark_mode', 'on');
    } else {
      element!.classList.remove('app-dark');
      localStorage.removeItem('dark_mode');
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
