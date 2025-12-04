import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { UnleashService } from '../services/unleash.service';

interface Movie {
  title: string;
  year: string;
  rating: string;
}

@Component({
  selector: 'app-recommendations',
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 transition-all duration-300"
         [style.padding-bottom]="isPanelOpen() ? '22rem' : '6rem'">
      <!-- Page Title -->
      <div class="text-center mb-6">
        <h1 class="text-3xl text-unleash dark:text-blue-400 mb-1 font-bold transition-colors">
          Unleash Demo (Recommendations)
        </h1>
        <p class="text-gray-600 dark:text-gray-300 text-base transition-colors">
          Personalized recommendations using feature flag variants
        </p>
        </div>

        <!-- Best Practices Content -->
        <div class="bg-white dark:bg-gray-800 p-6 mb-6 rounded-lg shadow-xl border-t-4 border-unleash dark:border-blue-500 transition-colors">
          <h2 class="text-2xl text-unleash dark:text-blue-400 mb-4 font-bold transition-colors">
            11 Best Practices for Using Unleash Feature Flags
          </h2>
          
          <div class="space-y-4 text-gray-700 dark:text-gray-300 text-sm transition-colors">
            <div>
              <h3 class="text-base font-semibold text-unleash dark:text-blue-400 mb-1 transition-colors">1. Use Descriptive Flag Names</h3>
              <p>Choose clear, self-explanatory names that describe what the flag controls. Use kebab-case for consistency (e.g., "new-checkout-flow").</p>
            </div>

            <div>
              <h3 class="text-base font-semibold text-unleash dark:text-blue-400 mb-1 transition-colors">2. Choose the Right Flag Type</h3>
              <p>Select the appropriate flag type: release toggles for gradual rollouts, experiment toggles for A/B tests, operational toggles for system behavior, permission toggles for access control, and kill switches for emergency shutdowns.</p>
            </div>

            <div>
              <h3 class="text-base font-semibold text-unleash dark:text-blue-400 mb-1 transition-colors">3. Plan for Flag Removal</h3>
              <p>Feature flags are temporary by design. Set a removal date when creating a flag and actively clean up old flags to prevent technical debt.</p>
            </div>

            <div>
              <h3 class="text-base font-semibold text-unleash dark:text-blue-400 mb-1 transition-colors">4. Use Gradual Rollouts</h3>
              <p>Start with a small percentage of users and gradually increase. This minimizes risk and allows you to catch issues early before they affect your entire user base.</p>
            </div>

            <div>
              <h3 class="text-base font-semibold text-unleash dark:text-blue-400 mb-1 transition-colors">5. Leverage Variants for A/B Testing</h3>
              <p>Use variants to test different versions of a feature simultaneously. This enables data-driven decisions about which implementation performs best.</p>
            </div>

            <div>
              <h3 class="text-base font-semibold text-unleash dark:text-blue-400 mb-1 transition-colors">6. Implement Kill Switches</h3>
              <p>Add kill switches for risky or resource-intensive features. This allows you to instantly disable problematic features without redeploying.</p>
            </div>

            <div>
              <h3 class="text-base font-semibold text-unleash dark:text-blue-400 mb-1 transition-colors">7. Use Targeting Rules Wisely</h3>
              <p>Target specific user segments, environments, or regions. This enables personalized experiences and safer testing in production.</p>
            </div>

            <div>
              <h3 class="text-base font-semibold text-unleash dark:text-blue-400 mb-1 transition-colors">8. Monitor Flag Usage</h3>
              <p>Track which flags are actively used, their rollout percentages, and their impact on system performance. Remove unused flags promptly.</p>
            </div>

            <div>
              <h3 class="text-base font-semibold text-unleash dark:text-blue-400 mb-1 transition-colors">9. Document Your Flags</h3>
              <p>Add comprehensive descriptions explaining what each flag does, why it exists, and what conditions should trigger its removal.</p>
            </div>

            <div>
              <h3 class="text-base font-semibold text-unleash dark:text-blue-400 mb-1 transition-colors">10. Test Both States</h3>
              <p>Ensure your application works correctly with the flag both enabled and disabled. Automate testing for both code paths to prevent regressions.</p>
            </div>

            <div>
              <h3 class="text-base font-semibold text-unleash dark:text-blue-400 mb-1 transition-colors">11. Integrate with Your Workflow</h3>
              <p>Connect Unleash with your CI/CD pipeline, monitoring tools, and incident response processes for a seamless development experience.</p>
            </div>
          </div>
        </div>

        <!-- Movie Recommendations (injected when flag is enabled) -->
        @if (recommendationsEnabled() && movies().length > 0) {
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700 p-6 mb-6 rounded-lg shadow-xl transition-colors">
            <h2 class="text-2xl text-white mb-4 font-bold">
              🎬 Recommended Movies For You
            </h2>
            
            <!-- Horizontal Movie List -->
            <div class="flex gap-4 overflow-x-auto pb-3">
              @for (movie of movies(); track movie.title) {
                <button 
                  (click)="onMovieClick(movie)"
                  class="flex-shrink-0 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-unleash dark:hover:border-blue-500 text-left">
                  <div class="bg-gradient-to-br from-gray-700 to-gray-900 h-[150px] flex items-center justify-center">
                    <span class="text-5xl">🎬</span>
                  </div>
                  <div class="p-3">
                    <h3 class="text-base font-bold text-gray-900 dark:text-white mb-0.5 transition-colors">{{ movie.title }}</h3>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mb-1.5 transition-colors">{{ movie.year }}</p>
                    <div class="flex items-center gap-1">
                      <span class="text-yellow-500 text-sm">⭐</span>
                      <span class="text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors">{{ movie.rating }}</span>
                    </div>
                  </div>
                </button>
              }
            </div>

            @if (algorithm()) {
              <p class="text-white text-xs mt-3 opacity-75">
                <em>Powered by {{ algorithm() === 'v2-ml' ? 'ML-based' : 'Simple' }} recommendation algorithm ({{ algorithm() }})</em>
              </p>
            }
          </div>
        }
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
                @if (recommendationsEnabled() && algorithm()) {
                  <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    ✓ Active ({{ algorithm() }})
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
                  <td class="p-2.5 text-sm text-gray-800 dark:text-gray-300 transition-colors">movie-recommendations</td>
                  <td class="p-2.5 transition-colors">
                    <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      experiment
                    </span>
                  </td>
                  <td class="p-2.5 text-xs text-gray-800 dark:text-gray-300 transition-colors">
                    A/B test with two variants (v1-simple and v2-ml) to compare recommendation algorithms.
                    The backend uses the variant name to determine which algorithm to execute. The frontend invokes the backend API only if the flag is active.
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- Info Message
            <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500 rounded transition-colors">
              <p class="text-blue-700 dark:text-blue-300 m-0 transition-colors">
                <strong>💡 Variants for A/B Testing</strong> - Variants allow you to test multiple versions of a feature simultaneously and collect data to determine which performs best. This enables data-driven decisions about which implementation to keep. The backend uses the variant name to determine which algorithm to execute.
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
export class RecommendationsComponent implements OnInit {
  recommendationsEnabled = signal<boolean>(false);
  movies = signal<Movie[]>([]);
  algorithm = signal<string | null>(null);
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
    
    // Check the recommendations flag
    this.checkRecommendationsFlag();
    
    // Listen for flag updates
    this.unleashService.onUpdate(() => {
      this.checkRecommendationsFlag();
    });
    
    // Mark as initialized after a brief delay to avoid FOUC
    setTimeout(() => this.isInitialized.set(true), 0);
  }

  togglePanel() {
    const newState = !this.isPanelOpen();
    this.isPanelOpen.set(newState);
    // Save panel state to localStorage
    localStorage.setItem('featureFlagsPanelOpen', String(newState));
  }

  checkRecommendationsFlag() {
    // Check if the flag is enabled (will also check variant)
    const isEnabled = this.unleashService.isEnabled('movie-recommendations');
    this.recommendationsEnabled.set(isEnabled);
    
    if (isEnabled) {
      // Flag is enabled - load recommendations from backend
      this.loadRecommendations();
    } else {
      // Flag is disabled - clear recommendations
      this.movies.set([]);
      this.algorithm.set(null);
    }
  }

  loadRecommendations() {
    // Pass the current userId to the backend so it can use the same context
    const userId = this.unleashService.getCurrentUserId();
    this.apiService.getRecommendations(userId).subscribe({
      next: (data) => {
        this.movies.set(data.movies);
        this.algorithm.set(data.algorithm);
      },
      error: (err) => {
        console.error('Failed to load recommendations:', err);
        this.movies.set([]);
      }
    });
  }

  onMovieClick(movie: Movie) {
    // TODO: integrate the new Impact Metrics to track experiment performance
    
    console.log(`🎬 User clicked on: ${movie.title} (${movie.year}) - Algorithm: ${this.algorithm()}`);
  }

  async simulateNewUser() {
    // Generate a new user and update context
    await this.unleashService.simulateNewUser();
    
    // Update the displayed userId
    this.currentUserId.set(this.unleashService.getCurrentUserId());
    
    // Refresh the recommendations with the new user context
    this.checkRecommendationsFlag();
  }
}

