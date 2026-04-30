import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-unleash dark:bg-gray-900 text-white px-6 py-2.5 shadow-md transition-colors">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-6">
          <h2 class="text-xl font-semibold">Unleash Demo</h2>
          <div class="flex gap-4">
            <a 
              routerLink="/" 
              routerLinkActive="bg-white/10"
              [routerLinkActiveOptions]="{exact: true}"
              class="text-white no-underline px-3 py-1.5 text-sm rounded transition-colors hover:bg-white/20">
              UI-only
            </a>
            <a 
              routerLink="/kill-switch" 
              routerLinkActive="bg-white/10"
              class="text-white no-underline px-3 py-1.5 text-sm rounded transition-colors hover:bg-white/20">
              Kill Switch
            </a>
            <a 
              routerLink="/recommendations" 
              routerLinkActive="bg-white/10"
              class="text-white no-underline px-3 py-1.5 text-sm rounded transition-colors hover:bg-white/20">
              Recommendations
            </a>
            <a 
              routerLink="/pricing-experiment" 
              routerLinkActive="bg-white/10"
              class="text-white no-underline px-3 py-1.5 text-sm rounded transition-colors hover:bg-white/20">
              Pricing Experiment
            </a>
          </div>
        </div>
        
        <!-- Dark Mode Toggle -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-white/70">☀️</span>
          <button
            (click)="darkModeService.toggle()"
            [class]="'relative inline-flex h-5 w-9 items-center rounded-full transition-colors ' + (darkModeService.isDarkMode() ? 'bg-blue-600' : 'bg-gray-300')"
            type="button">
            <span
              [class]="'inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ' + (darkModeService.isDarkMode() ? 'translate-x-5' : 'translate-x-0.5')">
            </span>
          </button>
          <span class="text-xs text-white/70">🌙</span>
        </div>
      </div>
    </nav>
  `,
  standalone: true
})
export class NavigationComponent {
  constructor(public darkModeService: DarkModeService) {}
}
