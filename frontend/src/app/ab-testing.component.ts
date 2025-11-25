import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ab-testing',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <!-- Navigation Bar -->
      <nav class="bg-unleash text-white px-8 py-4 shadow-md">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <div class="flex items-center gap-8">
            <h2 class="text-2xl font-semibold">Unleash Demo</h2>
            <div class="flex gap-6">
              <a routerLink="/" class="text-white/70 no-underline px-4 py-2 rounded transition-colors hover:bg-white/20">Kill Switch</a>
              <a routerLink="/ab-testing" class="text-white no-underline px-4 py-2 rounded transition-colors bg-white/10 hover:bg-white/20">A/B Testing</a>
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
            Unleash Demo (A/B Testing)
          </h1>
          <p class="text-gray-600 text-lg">
            Feature flag demonstration with Spring Boot backend and Angular frontend
          </p>
        </div>

        <!-- Feature Flags Info Table -->
        <div class="bg-white p-8 rounded-lg shadow-xl border-t-4 border-unleash">
          <div class="flex justify-between items-center mb-6">
            <h3 class="m-0 text-unleash text-2xl font-semibold">
              Feature Flags Configuration
            </h3>
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
              <tr class="border-b border-gray-200">
                <td colspan="3" class="p-8 text-center text-gray-400">
                  Coming soon...
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
export class AbTestingComponent {}
