import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkModeSignal = signal(false);
  
  // Public read-only signal
  isDarkMode = this.isDarkModeSignal.asReadonly();

  constructor() {
    // Load saved preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      this.enable();
    }
  }

  toggle(): void {
    if (this.isDarkModeSignal()) {
      this.disable();
    } else {
      this.enable();
    }
  }

  enable(): void {
    this.isDarkModeSignal.set(true);
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  }

  disable(): void {
    this.isDarkModeSignal.set(false);
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
}
