import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UnleashService } from '../services/unleash.service';
import { unleashConfig } from '../config/unleash.config';

@Component({
  selector: 'app-kill-switch',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <!-- Navigation Bar -->
      <nav class="bg-unleash text-white px-8 py-4 shadow-md">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <div class="flex items-center gap-8">
            <h2 class="text-2xl font-semibold">Unleash Demo</h2>
            <div class="flex gap-6">
              <a routerLink="/" class="text-white no-underline px-4 py-2 rounded transition-colors bg-white/10 hover:bg-white/20">Kill Switch</a>
              <a routerLink="/ab-testing" class="text-white/70 no-underline px-4 py-2 rounded transition-colors hover:bg-white/20">A/B Testing</a>
              <a routerLink="/gradual-rollout" class="text-white/70 no-underline px-4 py-2 rounded transition-colors hover:bg-white/20">Gradual Rollout</a>
              <a routerLink="/settings" class="text-white/70 no-underline px-4 py-2 rounded transition-colors hover:bg-white/20">Settings</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-8 py-12">
        <!-- Page Title -->
        <div class="text-center mb-12">
          <h1 class="text-4xl text-unleash mb-2 font-bold">
            Unleash Demo (Kill Switch)
          </h1>
          <p class="text-gray-600 text-lg">
            Show a different welcome message based on two feature flags, involving both backend and frontend.
          </p>
        </div>

        <!-- Message Display -->
        @if (message()) {
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 mb-8 rounded-lg shadow-lg">
            <h2 class="mt-0 text-xl font-semibold">
              {{ killSwitchActive() || apiError() ? 'Default Message (Graceful Degradation)' : 'Message from API' }}
            </h2>
            <p class="text-3xl font-bold my-4">{{ message() }}</p>
            <p class="text-sm mb-0 opacity-90">
              @if (killSwitchActive()) {
                <span>The "message_kill_switch" is active - showing default message without backend call.</span>
              } @else if (apiError()) {
                <span>There was an error connecting to the backend API - showing default message.</span>
              } @else {
                <span>This message is controlled by the "hello_name_message" feature flag in the backend.</span>
              }
            </p>
          </div>
        }
        
        <!-- Feature Flags Info Table -->
        <div class="bg-white p-8 rounded-lg shadow-xl border-t-4 border-unleash">
          <div class="flex justify-between items-center mb-6">
            <h3 class="m-0 text-unleash text-2xl font-semibold">
              Feature Flags Configuration
            </h3>
            <div class="px-4 py-2 rounded-full text-sm font-semibold"
                 [class.bg-green-100]="!killSwitchActive()"
                 [class.text-green-800]="!killSwitchActive()"
                 [class.bg-orange-100]="killSwitchActive()"
                 [class.text-orange-800]="killSwitchActive()">
              Kill Switch: {{ killSwitchActive() ? 'ACTIVE' : 'INACTIVE' }}
            </div>
          </div>
          
          <table class="w-full border-collapse mt-4">
            <thead>
              <tr class="bg-unleash text-white">
                <th class="p-4 text-left font-semibold border-b-2 border-gray-200">Flag Name</th>
                <th class="p-4 text-left font-semibold border-b-2 border-gray-200">Type</th>
                <th class="p-4 text-left font-semibold border-b-2 border-gray-200">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200 transition-colors hover:bg-gray-50">
                <td class="p-4 font-mono text-unleash font-semibold">
                  hello_name_message
                </td>
                <td class="p-4">
                  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-xs font-semibold">
                    Backend
                  </span>
                </td>
                <td class="p-4 text-gray-600">
                  Controls the greeting message. Returns "Hello Allianz" when enabled, "hello world" when disabled
                </td>
              </tr>
              <tr class="border-b border-gray-200 transition-colors hover:bg-gray-50">
                <td class="p-4 font-mono text-unleash font-semibold">
                  message_kill_switch
                </td>
                <td class="p-4">
                  <span class="bg-green-100 text-green-800 px-3 py-1 rounded-xl text-xs font-semibold">
                    Frontend
                  </span>
                </td>
                <td class="p-4 text-gray-600">
                  Emergency kill switch. Shows default message without API call when enabled (graceful degradation)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  standalone: true
})
export class KillSwitchComponent implements OnInit {
  message = signal<string>('');
  killSwitchActive = signal<boolean>(false);
  apiError = signal<boolean>(false);

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
    const killSwitchEnabled = this.unleashService.isEnabled(unleashConfig.features.messageKillSwitch);
    this.killSwitchActive.set(killSwitchEnabled);
    
    if (killSwitchEnabled) {
      // Kill switch is ON - show default message without calling API (graceful degradation)
      this.message.set('Default welcome message');
    } else {
      // Kill switch is OFF - load message from backend
      this.loadTestMessage();
    }
  }

  loadTestMessage() {
    if (this.killSwitchActive()) {
      // Don't make API call if kill switch is active
      return;
    }

    this.apiService.getTestMessage().subscribe({
      next: (data) => {
        this.message.set(data.message);
      },
      error: (err) => {
        // API error - show graceful degradation message instead of error
        console.error('Backend API error:', err);
        this.message.set('Default welcome message');
        this.apiError.set(true);
      }
    });
  }
}
