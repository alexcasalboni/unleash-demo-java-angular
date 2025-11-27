import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-only',
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Page Title -->
      <div class="text-center mb-12">
        <h1 class="text-4xl text-unleash dark:text-blue-400 mb-2 font-bold transition-colors">
          Unleash Demo (UI-only)
        </h1>
        <p class="text-gray-600 dark:text-gray-300 text-lg transition-colors">
          Show a light/dark mode toggle based on a frontend-only feature flag.
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
                <th class="p-4 text-left font-semibold border-b-2 border-gray-200">Flag Name</th>
                <th class="p-4 text-left font-semibold border-b-2 border-gray-200">Type</th>
                <th class="p-4 text-left font-semibold border-b-2 border-gray-200">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200 dark:border-gray-700 transition-colors">
                <td class="p-4 text-gray-800 dark:text-gray-300 transition-colors">dark-mode</td>
                <td class="p-4 text-gray-800 dark:text-gray-300 transition-colors">release</td>
                <td class="p-4 text-gray-800 dark:text-gray-300 transition-colors">
                  Enables dark mode toggle in the UI for better user experience in low-light environments
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Info Message -->
          <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500 rounded transition-colors">
            <p class="text-blue-700 dark:text-blue-300 m-0 transition-colors">
              <strong>💡 UI-only Feature Flag</strong> - The dark mode toggle is controlled by the "dark-mode" feature flag. Toggle it in Unleash to show/hide the dark mode switch in the navigation bar.
            </p>
          </div>
        </div>
      </div>
  `,
  standalone: true
})
export class UiOnlyComponent {}
