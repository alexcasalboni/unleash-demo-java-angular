import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnleashService } from '../services/unleash.service';

@Component({
  selector: 'app-ui-only',
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300"
         [style.padding-bottom]="isPanelOpen() ? '28rem' : '8rem'">
      <!-- Page Title -->
      <div class="text-center mb-12">
        <h1 class="text-4xl text-unleash dark:text-blue-400 mb-2 font-bold transition-colors">
          Unleash Demo (UI-only)
        </h1>
        <p class="text-gray-600 dark:text-gray-300 text-lg transition-colors">
          Show a light/dark mode toggle based on a frontend-only feature flag.
        </p>
      </div>

      <!-- Main Content Area -->
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border-t-4 border-unleash dark:border-blue-500 transition-colors">
        <h2 class="text-2xl text-unleash dark:text-blue-400 mb-4 font-semibold transition-colors">
          About UI-only Feature Flags
        </h2>
        <p class="text-gray-600 dark:text-gray-300 transition-colors">
          This page demonstrates a UI-only feature flag. The dark mode toggle in the navigation bar is controlled by the "dark-mode" feature flag. 
          When the flag is enabled, users can see and use the dark mode toggle. When disabled, the toggle is hidden.
        </p>
      </div>
    </div>

    <!-- Fixed Bottom Panel - Feature Flags Configuration -->
    <div class="fixed bottom-0 left-0 right-0 z-50">
      <div class="bg-white dark:bg-gray-800 border-t-4 border-unleash dark:border-blue-500 shadow-2xl transition-colors">
        <!-- Panel Header - Always Visible -->
        <button 
          (click)="togglePanel()"
          class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div class="flex items-center gap-4">
            <img src="/unleash_logo_white-square.png" alt="Unleash" class="h-8 w-8 dark:invert" />
            <h3 class="m-0 text-unleash dark:text-blue-400 text-xl font-semibold transition-colors">
              Feature Flags Configuration
            </h3>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-600 dark:text-gray-400 transition-colors">Status:</span>
                @if (flagEnabled()) {
                  <span class="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    ✓ Active
                  </span>
                } @else {
                  <span class="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    ✗ Inactive
                  </span>
                }
              </div>
              @if (isPanelOpen()) {
                <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                </svg>
              } @else {
                <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              }
            </div>
          </div>
        </button>

        <!-- Panel Content - Collapsible -->
        <div class="overflow-hidden duration-300"
             [class.transition-all]="isInitialized()"
             [style.max-height]="isPanelOpen() ? '24rem' : '0'">
          <div class="px-6 pb-6 overflow-y-auto" style="max-height: 24rem;">
            <!-- User Context Section -->
            <div class="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Current User Context</span>
              </div>
              
              <!-- User ID and Simulate Button -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-600 dark:text-gray-400 transition-colors">User ID:</span>
                    <code class="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 transition-colors">{{ currentUserId() }}</code>
                  </div>
                </div>
                <button 
                  (click)="simulateNewUser()"
                  class="px-4 py-2 bg-unleash hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Simulate New User
                </button>
              </div>
            </div>
            
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-unleash dark:bg-blue-600 text-white transition-colors">
                  <th class="p-4 text-left font-semibold border-b-2 border-gray-200 w-1/4">Flag Name</th>
                  <th class="p-4 text-left font-semibold border-b-2 border-gray-200 w-1/6">Type</th>
                  <th class="p-4 text-left font-semibold border-b-2 border-gray-200">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700 transition-colors">
                  <td class="p-4 text-gray-800 dark:text-gray-300 transition-colors">dark-mode</td>
                  <td class="p-4 transition-colors">
                    <span class="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      release
                    </span>
                  </td>
                  <td class="p-4 text-gray-800 dark:text-gray-300 transition-colors">
                    Enables the dark mode toggle in the navigation bar. This is a UI-only feature flag that doesn't require backend changes - the frontend autonomously checks the flag and shows/hides the toggle accordingly.
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- Info Message
            <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500 rounded transition-colors">
              <p class="text-blue-700 dark:text-blue-300 m-0 transition-colors">
                <strong>💡 UI-only Feature Flag</strong> - The dark mode toggle is controlled by the "dark-mode" feature flag. Toggle it in Unleash to show/hide the dark mode switch in the navigation bar.
              </p>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true
})
export class UiOnlyComponent implements OnInit {
  flagEnabled = signal<boolean>(false);
  currentUserId = signal<string>('');
  isPanelOpen = signal<boolean>(
    typeof localStorage !== 'undefined' && localStorage.getItem('featureFlagsPanelOpen') === 'true'
  );
  isInitialized = signal<boolean>(false);

  constructor(private unleashService: UnleashService) {}

  async ngOnInit() {
    await this.unleashService.initialize();
    
    // Get current userId
    this.currentUserId.set(this.unleashService.getCurrentUserId());
    
    this.checkFlag();
    
    this.unleashService.onUpdate(() => {
      this.checkFlag();
    });
    
    // Mark as initialized after a brief delay to avoid FOUC
    setTimeout(() => this.isInitialized.set(true), 0);
  }

  checkFlag() {
    this.flagEnabled.set(this.unleashService.isEnabled('dark-mode'));
  }

  togglePanel() {
    const newState = !this.isPanelOpen();
    this.isPanelOpen.set(newState);
    // Save panel state to localStorage
    localStorage.setItem('featureFlagsPanelOpen', String(newState));
  }

  async simulateNewUser() {
    await this.unleashService.simulateNewUser();
    this.currentUserId.set(this.unleashService.getCurrentUserId());
    this.checkFlag();
  }
}
