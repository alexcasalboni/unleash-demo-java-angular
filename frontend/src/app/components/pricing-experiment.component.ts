import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';

@Component({
  selector: 'app-pricing-experiment',
  imports: [CommonModule, NavigationComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <!-- Navigation Bar -->
      <app-navigation currentPage="pricing-experiment"></app-navigation>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-8 py-12">
        <!-- Page Title -->
        <div class="text-center mb-12">
          <h1 class="text-4xl text-unleash dark:text-blue-400 mb-2 font-bold transition-colors">
            Unleash Demo (Pricing Experiment)
          </h1>
          <p class="text-gray-600 dark:text-gray-300 text-lg transition-colors">
            Feature flag demonstration with Spring Boot backend and Angular frontend
          </p>
        </div>

        <!-- Feature Flags Info Table -->
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border-t-4 border-unleash dark:border-blue-500 transition-colors">
          <div class="flex justify-between items-center mb-6">
            <h3 class="m-0 text-unleash dark:text-blue-400 text-2xl font-semibold transition-colors">
              Feature Flags Configuration
            </h3>
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
export class PricingExperimentComponent {}
