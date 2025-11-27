import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { UnleashService } from '../services/unleash.service';

@Component({
  selector: 'app-kill-switch',
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Page Title -->
      <div class="text-center mb-12">
        <h1 class="text-4xl text-unleash dark:text-blue-400 mb-2 font-bold transition-colors">
          Unleash Demo (Kill Switch)
        </h1>
        <p class="text-gray-600 dark:text-gray-300 text-lg transition-colors">
          Immediately disable a slow/risky feature using a kill switch
        </p>
      </div>

      <!-- Reports Feature Section -->
      <div class="bg-white dark:bg-gray-800 p-8 mb-8 rounded-lg shadow-xl border-t-4 border-unleash dark:border-blue-500 transition-colors">
        <h2 class="text-2xl text-unleash dark:text-blue-400 mb-4 font-semibold transition-colors">
          📊 Reports Feature
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6 transition-colors">
            This feature simulates a slow, resource-intensive operation that takes 5 seconds to complete.
            Use the kill switch to disable it immediately if needed.
          </p>

          <!-- Kill Switch Active - Feature Disabled -->
          @if (reportsKillSwitchActive()) {
            <div class="bg-orange-50 dark:bg-orange-900/30 border-l-4 border-orange-500 p-6 rounded transition-colors">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">⚠️</span>
                <h3 class="text-orange-800 dark:text-orange-300 font-semibold text-lg m-0 transition-colors">
                  Feature Temporarily Unavailable
                </h3>
              </div>
              <p class="text-orange-700 dark:text-orange-400 m-0 transition-colors">
                The reports feature has been disabled via kill switch. This allows us to immediately stop a slow or problematic feature without redeploying.
              </p>
            </div>
          }

          <!-- Kill Switch Inactive - Feature Available -->
          @if (!reportsKillSwitchActive()) {
            <div class="space-y-4">
              <button
                (click)="generateReport()"
                [disabled]="isGeneratingReport()"
                class="bg-unleash dark:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                @if (isGeneratingReport()) {
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                <div class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-4 rounded transition-colors">
                  <p class="text-green-800 dark:text-green-300 m-0 transition-colors">
                    <strong>Report Generated Successfully!</strong><br>
                    The answer is: <span class="font-mono text-xl">{{ reportResult() }}</span>
                  </p>
                </div>
              }

              @if (reportError()) {
                <div class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-4 rounded transition-colors">
                  <p class="text-red-800 dark:text-red-300 m-0 transition-colors">
                    <strong>❌ Error:</strong> {{ reportError() }}
                  </p>
                </div>
              }
            </div>
          }
        </div>
        
        <!-- Feature Flags Info Table -->
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border-t-4 border-unleash dark:border-blue-500 transition-colors">
          <div class="flex justify-between items-center mb-6">
            <h3 class="m-0 text-unleash dark:text-blue-400 text-2xl font-semibold transition-colors">
              Feature Flags Configuration
            </h3>
            <div class="px-4 py-2 rounded-full text-sm font-semibold"
                 [class.bg-green-100]="!reportsKillSwitchActive()"
                 [class.text-green-800]="!reportsKillSwitchActive()"
                 [class.bg-orange-100]="reportsKillSwitchActive()"
                 [class.text-orange-800]="reportsKillSwitchActive()"
                 [class.dark:bg-green-900]="!reportsKillSwitchActive()"
                 [class.dark:text-green-200]="!reportsKillSwitchActive()"
                 [class.dark:bg-orange-900]="reportsKillSwitchActive()"
                 [class.dark:text-orange-200]="reportsKillSwitchActive()">
              Kill Switch: {{ reportsKillSwitchActive() ? 'ACTIVE' : 'INACTIVE' }}
            </div>
          </div>
          
          <table class="w-full border-collapse mt-4">
            <thead>
              <tr class="bg-unleash dark:bg-blue-600 text-white transition-colors">
                <th class="p-4 text-left font-semibold border-b-2 border-gray-200 dark:border-gray-700">Flag Name</th>
                <th class="p-4 text-left font-semibold border-b-2 border-gray-200 dark:border-gray-700">Type</th>
                <th class="p-4 text-left font-semibold border-b-2 border-gray-200 dark:border-gray-700">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="p-4 font-mono text-unleash dark:text-blue-400 font-semibold transition-colors">
                  disable-slow-reports
                </td>
                <td class="p-4">
                  <span class="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-xl text-xs font-semibold transition-colors">
                    Kill Switch
                  </span>
                </td>
                <td class="p-4 text-gray-600 dark:text-gray-300 transition-colors">
                  Emergency kill switch to immediately disable the slow reports feature (5 second API call)
                </td>
              </tr>
            </tbody>
          </table>
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

  constructor(
    private apiService: ApiService,
    private unleashService: UnleashService
  ) {}

  async ngOnInit() {
    // Initialize Unleash
    await this.unleashService.initialize();
    
    // Check the kill switch flag
    this.checkKillSwitch();
    
    // Listen for flag updates
    this.unleashService.onUpdate(() => {
      this.checkKillSwitch();
    });
  }

  checkKillSwitch() {
    const killSwitchEnabled = this.unleashService.isEnabled('disable-slow-reports');
    this.reportsKillSwitchActive.set(killSwitchEnabled);
  }

  generateReport() {
    // Reset previous results
    this.reportResult.set(null);
    this.reportError.set(null);
    this.isGeneratingReport.set(true);

    this.apiService.generateReport().subscribe({
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
}

