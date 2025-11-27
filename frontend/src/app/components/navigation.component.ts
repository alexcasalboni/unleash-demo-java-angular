import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DarkModeService } from '../services/dark-mode.service';
import { UnleashService } from '../services/unleash.service';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-unleash dark:bg-gray-900 text-white px-8 py-4 shadow-md transition-colors">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-8">
          <h2 class="text-2xl font-semibold">Unleash Demo</h2>
          <div class="flex gap-6">
            <a 
              routerLink="/" 
              [class]="currentPage === 'ui-only' ? 'text-white no-underline px-4 py-2 rounded transition-colors bg-white/10 hover:bg-white/20' : 'text-white/70 no-underline px-4 py-2 rounded transition-colors hover:bg-white/20'">
              UI-only
            </a>
            <a 
              routerLink="/kill-switch" 
              [class]="currentPage === 'kill-switch' ? 'text-white no-underline px-4 py-2 rounded transition-colors bg-white/10 hover:bg-white/20' : 'text-white/70 no-underline px-4 py-2 rounded transition-colors hover:bg-white/20'">
              Kill Switch
            </a>
            <a 
              routerLink="/recommendations" 
              [class]="currentPage === 'recommendations' ? 'text-white no-underline px-4 py-2 rounded transition-colors bg-white/10 hover:bg-white/20' : 'text-white/70 no-underline px-4 py-2 rounded transition-colors hover:bg-white/20'">
              Recommendations
            </a>
            <a 
              routerLink="/pricing-experiment" 
              [class]="currentPage === 'pricing-experiment' ? 'text-white no-underline px-4 py-2 rounded transition-colors bg-white/10 hover:bg-white/20' : 'text-white/70 no-underline px-4 py-2 rounded transition-colors hover:bg-white/20'">
              Pricing Experiment
            </a>
          </div>
        </div>
        
        <!-- Dark Mode Toggle (shown when feature flag is enabled) -->
        @if (darkModeFeatureEnabled()) {
          <div class="flex items-center gap-3">
            <span class="text-sm text-white/70">☀️ Light</span>
            <button
              (click)="darkModeService.toggle()"
              [class]="'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (darkModeService.isDarkMode() ? 'bg-blue-600' : 'bg-gray-300')"
              type="button">
              <span
                [class]="'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (darkModeService.isDarkMode() ? 'translate-x-6' : 'translate-x-1')">
              </span>
            </button>
            <span class="text-sm text-white/70">🌙 Dark</span>
          </div>
        }
      </div>
    </nav>
  `,
  standalone: true
})
export class NavigationComponent implements OnInit {
  @Input() currentPage: 'ui-only' | 'kill-switch' | 'premium-chat' | 'recommendations' | 'pricing-experiment' = 'ui-only';
  
  darkModeFeatureEnabled = signal(false);
  
  constructor(
    public darkModeService: DarkModeService,
    private unleashService: UnleashService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.unleashService.initialize();
    
    // Check if dark-mode feature flag is enabled
    const isDarkModeEnabled = this.unleashService.isEnabled('dark-mode');
    this.darkModeFeatureEnabled.set(isDarkModeEnabled);
    
    // If feature flag is disabled, force light mode
    if (!isDarkModeEnabled) {
      this.darkModeService.disable();
    }
    
    // Listen for feature flag updates
    this.unleashService.onUpdate(() => {
      const isEnabled = this.unleashService.isEnabled('dark-mode');
      this.darkModeFeatureEnabled.set(isEnabled);
      
      // If feature flag is disabled, force light mode
      if (!isEnabled) {
        this.darkModeService.disable();
      }
    });
  }
}
