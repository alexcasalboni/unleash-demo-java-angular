import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { UnleashService } from '../services/unleash.service';

@Component({
  selector: 'app-kill-switch',
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 transition-all duration-300"
         [style.padding-bottom]="isPanelOpen() ? '22rem' : '6rem'">
      <!-- Page Title -->
      <div class="text-center mb-6">
        <h1 class="text-3xl text-unleash dark:text-blue-400 mb-1 font-bold transition-colors">
          Unleash Demo (Kill Switch)
        </h1>
        <p class="text-gray-600 dark:text-gray-300 text-base transition-colors">
          Immediately disable a slow/risky feature using a kill switch
        </p>
      </div>

      <!-- Reports Feature Section -->
      <div class="bg-white dark:bg-gray-800 p-6 mb-6 rounded-lg shadow-xl border-t-4 border-unleash dark:border-blue-500 transition-colors">
        <h2 class="text-xl text-unleash dark:text-blue-400 mb-3 font-semibold transition-colors">
          Reports Feature
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 transition-colors">
            This feature simulates a slow, resource-intensive operation that takes 5 seconds to complete.
            Use the kill switch to disable it immediately if needed.
          </p>

          <!-- Kill Switch Active - Graceful Degradation Warning -->
          @if (reportsKillSwitchActive()) {
            <div class="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded mb-3 transition-colors">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="text-xl">⚠️</span>
                <h3 class="text-yellow-800 dark:text-yellow-300 font-semibold text-base m-0 transition-colors">
                  Warning: Data Might Be Obsolete
                </h3>
              </div>
              <p class="text-yellow-700 dark:text-yellow-400 text-sm m-0 transition-colors">
                The kill switch is active. The backend is returning cached results to avoid the slow operation. Data may not be up-to-date, but the feature remains accessible for graceful degradation.
              </p>
            </div>
          }

          <!-- Feature Available (both states) -->
          <div class="space-y-3">
              <button
                (click)="generateReport()"
                [disabled]="isGeneratingReport()"
                class="bg-unleash dark:bg-blue-600 text-white px-5 py-2.5 text-sm rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                @if (isGeneratingReport()) {
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Report...
                  </span>
                } @else {
                  Generate Report
                }
              </button>

              @if (reportResult()) {
                <div class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-3 rounded transition-colors">
                  <p class="text-green-800 dark:text-green-300 text-sm m-0 transition-colors">
                    <strong>Report Generated Successfully</strong><br>
                    The answer is: <span class="font-mono text-lg">{{ reportResult() }}</span>
                  </p>
                </div>
              }

              @if (reportError()) {
                <div class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-3 rounded transition-colors">
                  <p class="text-red-800 dark:text-red-300 text-sm m-0 transition-colors">
                    <strong>❌ Error:</strong> {{ reportError() }}
                  </p>
                </div>
              }
            </div>
        </div>
      </div>

    <!-- Fixed Bottom Panel - Feature Flags Configuration -->
    <div class="fixed bottom-0 left-0 right-0 z-50">
      <div class="bg-white dark:bg-gray-800 border-t-4 border-unleash dark:border-blue-500 shadow-2xl transition-colors">
        <!-- Panel Header - Always Visible -->
        <button 
          (click)="togglePanel()"
          class="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div class="flex items-center gap-3">
            <img src="/unleash_logo_white-square.png" alt="Unleash" class="h-7 w-7 dark:invert" />
            <h3 class="m-0 text-unleash dark:text-blue-400 text-lg font-semibold transition-colors">
              Feature Flags Configuration
            </h3>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-600 dark:text-gray-400 transition-colors">Status:</span>
                @if (reportsKillSwitchActive()) {
                  <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    ✓ Active
                  </span>
                } @else {
                  <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    ✗ Inactive
                  </span>
                }
              </div>
              @if (isPanelOpen()) {
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                </svg>
              } @else {
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              }
            </div>
          </div>
        </button>

        <!-- Panel Content - Collapsible -->
        <div class="overflow-hidden duration-300"
             [class.transition-all]="isInitialized()"
             [style.max-height]="isPanelOpen() ? '18rem' : '0'">
          <div class="px-6 pb-4 overflow-y-auto" style="max-height: 18rem;">
            <!-- User Context Section -->
            <div class="mb-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors">Current User Context</span>
              </div>
              
              <!-- User ID and Simulate Button -->
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-600 dark:text-gray-400 transition-colors">User ID:</span>
                    <code class="text-xs bg-white dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 transition-colors">{{ currentUserId() }}</code>
                  </div>
                </div>
                <button 
                  (click)="simulateNewUser()"
                  class="px-3 py-1.5 bg-unleash hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Simulate New User
                </button>
              </div>
            </div>
            
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-unleash dark:bg-blue-600 text-white transition-colors">
                  <th class="p-2.5 text-left text-sm font-semibold border-b-2 border-gray-200 w-1/4">Flag Name</th>
                  <th class="p-2.5 text-left text-sm font-semibold border-b-2 border-gray-200 w-1/6">Type</th>
                  <th class="p-2.5 text-left text-sm font-semibold border-b-2 border-gray-200">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700 transition-colors">
                  <td class="p-2.5 text-sm text-gray-800 dark:text-gray-300 transition-colors">disable-slow-reports</td>
                  <td class="p-2.5 transition-colors">
                    <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      kill-switch
                    </span>
                  </td>
                  <td class="p-2.5 text-xs text-gray-800 dark:text-gray-300 transition-colors">
                    Emergency toggle to immediately reduce load from slow operations without redeploying. When active, the backend returns cached results instead of performing the slow operation, providing graceful degradation.
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- Info Message 
            <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500 rounded transition-colors">
              <p class="text-blue-700 dark:text-blue-300 m-0 transition-colors">
                <strong>💡 Kill Switch Pattern</strong> - A kill switch enables graceful degradation by allowing you to immediately reduce the load from problematic or resource-intensive features without redeploying. The backend returns cached/simplified responses while the frontend shows a warning, keeping the feature accessible but with reduced functionality. This is critical for incident response and system stability.
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
export class KillSwitchComponent implements OnInit {
  reportsKillSwitchActive = signal<boolean>(false);
  isGeneratingReport = signal<boolean>(false);
  reportResult = signal<number | null>(null);
  reportError = signal<string | null>(null);
  currentUserId = signal<string>('');
  isPanelOpen = signal<boolean>(
    typeof localStorage !== 'undefined' && localStorage.getItem('featureFlagsPanelOpen') === 'true'
  );
  isInitialized = signal<boolean>(false);

  constructor(
    private apiService: ApiService,
    private unleashService: UnleashService
  ) {}

  async ngOnInit() {
    // Initialize Unleash
    await this.unleashService.initialize();
    
    // Get current userId
    this.currentUserId.set(this.unleashService.getCurrentUserId());
    
    // Check the kill switch flag
    this.checkKillSwitch();
    
    // Listen for flag updates
    this.unleashService.onUpdate(() => {
      this.checkKillSwitch();
    });
    
    // Mark as initialized after a brief delay to avoid FOUC
    setTimeout(() => this.isInitialized.set(true), 0);
  }

  checkKillSwitch() {
    const killSwitchEnabled = this.unleashService.isEnabled('disable-slow-reports');
    this.reportsKillSwitchActive.set(killSwitchEnabled);
  }

  togglePanel() {
    const newState = !this.isPanelOpen();
    this.isPanelOpen.set(newState);
    // Save panel state to localStorage
    localStorage.setItem('featureFlagsPanelOpen', String(newState));
  }

  generateReport() {
    // Reset previous results
    this.reportResult.set(null);
    this.reportError.set(null);
    this.isGeneratingReport.set(true);

    // Pass userId for consistency (though kill-switch doesn't use variants)
    const userId = this.unleashService.getCurrentUserId();
    this.apiService.generateReport(userId).subscribe({
      next: (data) => {
        this.isGeneratingReport.set(false);
        this.reportResult.set(data.result);
      },
      error: (err) => {
        this.isGeneratingReport.set(false);
        this.reportError.set('Failed to generate report. Please try again.');
        console.error('Report generation error:', err);
      }
    });
  }

  async simulateNewUser() {
    await this.unleashService.simulateNewUser();
    this.currentUserId.set(this.unleashService.getCurrentUserId());
    this.checkKillSwitch();
  }
}

