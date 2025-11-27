import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { ApiService } from '../services/api.service';
import { UnleashService } from '../services/unleash.service';

interface Movie {
  title: string;
  year: string;
  rating: string;
}

@Component({
  selector: 'app-recommendations',
  imports: [CommonModule, NavigationComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <!-- Navigation Bar -->
      <app-navigation currentPage="recommendations"></app-navigation>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-8 py-12">
        <!-- Page Title -->
        <div class="text-center mb-12">
          <h1 class="text-4xl text-unleash dark:text-blue-400 mb-2 font-bold transition-colors">
            Unleash Demo (Recommendations)
          </h1>
          <p class="text-gray-600 dark:text-gray-300 text-lg transition-colors">
            Personalized recommendations using feature flag variants
          </p>
        </div>

        <!-- Best Practices Content -->
        <div class="bg-white dark:bg-gray-800 p-8 mb-8 rounded-lg shadow-xl border-t-4 border-unleash dark:border-blue-500 transition-colors">
          <h2 class="text-3xl text-unleash dark:text-blue-400 mb-6 font-bold transition-colors">
            11 Best Practices for Using Unleash Feature Flags
          </h2>
          
          <div class="space-y-6 text-gray-700 dark:text-gray-300 transition-colors">
            <div>
              <h3 class="text-xl font-semibold text-unleash dark:text-blue-400 mb-2 transition-colors">1. Use Descriptive Flag Names</h3>
              <p>Choose clear, self-explanatory names that describe what the flag controls. Use kebab-case for consistency (e.g., "new-checkout-flow").</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-unleash dark:text-blue-400 mb-2 transition-colors">2. Choose the Right Flag Type</h3>
              <p>Select the appropriate flag type: release toggles for gradual rollouts, experiment toggles for A/B tests, operational toggles for system behavior, permission toggles for access control, and kill switches for emergency shutdowns.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-unleash dark:text-blue-400 mb-2 transition-colors">3. Plan for Flag Removal</h3>
              <p>Feature flags are temporary by design. Set a removal date when creating a flag and actively clean up old flags to prevent technical debt.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-unleash dark:text-blue-400 mb-2 transition-colors">4. Use Gradual Rollouts</h3>
              <p>Start with a small percentage of users and gradually increase. This minimizes risk and allows you to catch issues early before they affect your entire user base.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-unleash dark:text-blue-400 mb-2 transition-colors">5. Leverage Variants for A/B Testing</h3>
              <p>Use variants to test different versions of a feature simultaneously. This enables data-driven decisions about which implementation performs best.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-unleash dark:text-blue-400 mb-2 transition-colors">6. Implement Kill Switches</h3>
              <p>Add kill switches for risky or resource-intensive features. This allows you to instantly disable problematic features without redeploying.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-unleash dark:text-blue-400 mb-2 transition-colors">7. Use Targeting Rules Wisely</h3>
              <p>Target specific user segments, environments, or regions. This enables personalized experiences and safer testing in production.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-unleash dark:text-blue-400 mb-2 transition-colors">8. Monitor Flag Usage</h3>
              <p>Track which flags are actively used, their rollout percentages, and their impact on system performance. Remove unused flags promptly.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-unleash dark:text-blue-400 mb-2 transition-colors">9. Document Your Flags</h3>
              <p>Add comprehensive descriptions explaining what each flag does, why it exists, and what conditions should trigger its removal.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-unleash dark:text-blue-400 mb-2 transition-colors">10. Test Both States</h3>
              <p>Ensure your application works correctly with the flag both enabled and disabled. Automate testing for both code paths to prevent regressions.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-unleash dark:text-blue-400 mb-2 transition-colors">11. Integrate with Your Workflow</h3>
              <p>Connect Unleash with your CI/CD pipeline, monitoring tools, and incident response processes for a seamless development experience.</p>
            </div>
          </div>
        </div>

        <!-- Movie Recommendations (injected when flag is enabled) -->
        @if (recommendationsEnabled() && movies().length > 0) {
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700 p-8 mb-8 rounded-lg shadow-xl transition-colors">
            <h2 class="text-3xl text-white mb-6 font-bold">
              🎬 Recommended Movies For You
            </h2>
            
            <!-- Horizontal Movie List -->
            <div class="flex gap-6 overflow-x-auto pb-4">
              @for (movie of movies(); track movie.title) {
                <div class="flex-shrink-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                  <div class="bg-gradient-to-br from-gray-700 to-gray-900 h-80 flex items-center justify-center">
                    <span class="text-6xl">🎬</span>
                  </div>
                  <div class="p-4">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors">{{ movie.title }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors">{{ movie.year }}</p>
                    <div class="flex items-center gap-1">
                      <span class="text-yellow-500">⭐</span>
                      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">{{ movie.rating }}</span>
                    </div>
                  </div>
                </div>
              }
            </div>

            @if (algorithm()) {
              <p class="text-white text-sm mt-4 opacity-75">
                <em>Powered by {{ algorithm() === 'v2-ml' ? 'ML-based' : 'Simple' }} recommendation algorithm ({{ algorithm() }})</em>
              </p>
            }
          </div>
        }

        <!-- Feature Flags Info Table -->
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border-t-4 border-unleash dark:border-blue-500 transition-colors">
          <div class="flex justify-between items-center mb-6">
            <h3 class="m-0 text-unleash dark:text-blue-400 text-2xl font-semibold transition-colors">
              Feature Flags Configuration
            </h3>
            @if (recommendationsEnabled()) {
              <div class="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 transition-colors">
                Recommendations: ENABLED
              </div>
            }
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
                  movie-recommendations
                </td>
                <td class="p-4">
                  <span class="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-xl text-xs font-semibold transition-colors">
                    Experiment
                  </span>
                </td>
                <td class="p-4 text-gray-600 dark:text-gray-300 transition-colors">
                  Shows personalized movie recommendations. Uses variants (v1-simple, v2-ml) to test different recommendation algorithms.
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
export class RecommendationsComponent implements OnInit {
  recommendationsEnabled = signal<boolean>(false);
  movies = signal<Movie[]>([]);
  algorithm = signal<string | null>(null);

  constructor(
    private apiService: ApiService,
    private unleashService: UnleashService
  ) {}

  async ngOnInit() {
    // Initialize Unleash
    await this.unleashService.initialize();
    
    // Check the recommendations flag
    this.checkRecommendationsFlag();
    
    // Listen for flag updates
    this.unleashService.onUpdate(() => {
      this.checkRecommendationsFlag();
    });
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
    this.apiService.getRecommendations().subscribe({
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
}

