import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnleashService } from '../services/unleash.service';

@Component({
  selector: 'app-pricing-experiment',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300"
         [style.padding-bottom]="isPanelOpen() ? '28rem' : '8rem'">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Pricing Experiment (A/B Testing)
        </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A/B testing with variants and context-based targeting.
          </p>
        </div>

        <!-- Pricing Cards - Control Variant -->
        @if (currentVariant() === 'control') {
          <div class="max-w-5xl mx-auto">
            <div class="grid md:grid-cols-2 gap-8">
              <!-- Monthly Plan -->
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-gray-200 dark:border-gray-700">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Monthly Plan</h3>
                <div class="mb-6">
                  <span class="text-5xl font-bold text-gray-900 dark:text-white">$29</span>
                  <span class="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    All features included
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    24/7 support
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Cancel anytime
                  </li>
                </ul>
                <button 
                  (click)="onCtaClick('monthly', 'control')"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                  Get Started
                </button>
              </div>

              <!-- Yearly Plan -->
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-gray-200 dark:border-gray-700">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Yearly Plan</h3>
                <div class="mb-6">
                  <span class="text-5xl font-bold text-gray-900 dark:text-white">$290</span>
                  <span class="text-gray-600 dark:text-gray-400">/year</span>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    All features included
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    24/7 support
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Save 2 months!
                  </li>
                </ul>
                <button 
                  (click)="onCtaClick('yearly', 'control')"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        }

        <!-- Pricing Cards - Promo V1 Variant (Discount Banner) -->
        @if (currentVariant() === 'promo_v1') {
          <div class="max-w-5xl mx-auto">
            <!-- Discount Banner -->
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-6 mb-8 text-center">
              <h2 class="text-3xl font-bold text-white mb-2">🎉 Limited Time Offer!</h2>
              <p class="text-xl text-purple-100">Save up to 20% on all plans today!</p>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
              <!-- Monthly Plan -->
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-purple-300 dark:border-purple-700">
                <div class="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  20% OFF
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Monthly Plan</h3>
                <div class="mb-6">
                  <span class="text-5xl font-bold text-gray-900 dark:text-white">$23</span>
                  <span class="text-gray-600 dark:text-gray-400">/month</span>
                  <div class="text-sm text-gray-500 line-through mt-1">Was $29/month</div>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    All features included
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    24/7 support
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Cancel anytime
                  </li>
                </ul>
                <button 
                  (click)="onCtaClick('monthly', 'promo_v1')"
                  class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg">
                  Claim This Deal!
                </button>
              </div>

              <!-- Yearly Plan -->
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-purple-300 dark:border-purple-700">
                <div class="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  20% OFF
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Yearly Plan</h3>
                <div class="mb-6">
                  <span class="text-5xl font-bold text-gray-900 dark:text-white">$232</span>
                  <span class="text-gray-600 dark:text-gray-400">/year</span>
                  <div class="text-sm text-gray-500 line-through mt-1">Was $290/year</div>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    All features included
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    24/7 support
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Save even more!
                  </li>
                </ul>
                <button 
                  (click)="onCtaClick('yearly', 'promo_v1')"
                  class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg">
                  Claim This Deal!
                </button>
              </div>
            </div>
          </div>
        }

        <!-- Pricing Cards - Promo V2 Variant (Emphasize Yearly) -->
        @if (currentVariant() === 'promo_v2') {
          <div class="max-w-5xl mx-auto">
            <div class="grid md:grid-cols-2 gap-8">
              <!-- Monthly Plan -->
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-gray-300 dark:border-gray-700 opacity-75">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Monthly Plan</h3>
                <div class="mb-6">
                  <span class="text-5xl font-bold text-gray-900 dark:text-white">$29</span>
                  <span class="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    All features included
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    24/7 support
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Cancel anytime
                  </li>
                </ul>
                <button 
                  (click)="onCtaClick('monthly', 'promo_v2')"
                  class="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                  Get Started
                </button>
              </div>

              <!-- Yearly Plan - EMPHASIZED -->
              <div class="bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 rounded-lg shadow-2xl p-8 border-4 border-orange-400 dark:border-orange-500 transform scale-105 relative">
                <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span class="bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    ⭐ BEST VALUE ⭐
                  </span>
                </div>
                <h3 class="text-2xl font-bold text-white mb-4 mt-4">Yearly Plan</h3>
                <div class="mb-6">
                  <span class="text-5xl font-bold text-white">$290</span>
                  <span class="text-orange-100">/year</span>
                  <div class="text-sm text-orange-100 mt-2 font-semibold">
                    Save $58 compared to monthly!
                  </div>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center text-white">
                    <svg class="w-5 h-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    All features included
                  </li>
                  <li class="flex items-center text-white">
                    <svg class="w-5 h-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Priority 24/7 support
                  </li>
                  <li class="flex items-center text-white">
                    <svg class="w-5 h-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    2 months FREE!
                  </li>
                  <li class="flex items-center text-white">
                    <svg class="w-5 h-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Exclusive bonuses
                  </li>
                </ul>
                <button 
                  (click)="onCtaClick('yearly', 'promo_v2')"
                  class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-lg transition duration-200 shadow-xl text-lg">
                  Choose Yearly & Save!
                </button>
              </div>
            </div>
          </div>
        }
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
                @if (currentVariant() !== 'control') {
                  <span class="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    ✓ Active ({{ currentVariant() }})
                  </span>
                } @else {
                  <span class="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    ✗ Inactive (control)
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
              
              <!-- Country Selector -->
              <div>
                <label for="country" class="block text-xs text-gray-600 dark:text-gray-400 transition-colors mb-1">
                  Country (Context Targeting):
                </label>
                <select
                  id="country"
                  [(ngModel)]="selectedCountry"
                  (change)="onCountryChange()"
                  class="w-80 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-unleash focus:border-unleash bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                >
                  <option value="DE">🇩🇪 Germany (DE)</option>
                  <option value="IT">🇮🇹 Italy (IT)</option>
                  <option value="FR">🇫🇷 France (FR)</option>
                  <option value="ES">🇪🇸 Spain (ES)</option>
                  <option value="UK">🇬🇧 United Kingdom (UK)</option>
                  <option value="US">🇺🇸 United States (US)</option>
                </select>
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
                  <td class="p-4 text-gray-800 dark:text-gray-300 transition-colors">pricing-experiment</td>
                  <td class="p-4 transition-colors">
                    <span class="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      experiment
                    </span>
                  </td>
                  <td class="p-4 text-gray-800 dark:text-gray-300 transition-colors">
                    A/B test with three variants (control, promo_v1, promo_v2) to optimize pricing page conversion. Uses context-based targeting to enable only for specific countries.
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- Info Message 
            <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500 rounded transition-colors">
              <p class="text-blue-700 dark:text-blue-300 m-0 transition-colors">
                <strong>💡 Experiment with Variants & Context</strong> - This experiment uses variants to test different pricing layouts and context-based targeting to enable only for specific countries. The frontend provides user context (country), while Unleash handles all targeting logic.
              </p>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PricingExperimentComponent implements OnInit {
  selectedCountry = signal<string>('IT');
  experimentEnabled = signal<boolean>(false);
  currentVariant = signal<string>('control');
  currentUserId = signal<string>('');
  isPanelOpen = signal<boolean>(
    typeof localStorage !== 'undefined' && localStorage.getItem('featureFlagsPanelOpen') === 'true'
  );
  isInitialized = signal<boolean>(false);

  constructor(private unleashService: UnleashService) {}

  ngOnInit() {
    this.unleashService.start().then(() => {
      // Get current userId
      this.currentUserId.set(this.unleashService.getCurrentUserId());
      
      this.checkExperiment();
    });

    // Listen for Unleash updates
    this.unleashService.on('update', () => {
      this.checkExperiment();
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

  onCountryChange() {
    // Update Unleash context with new country (keeping the same userId)
    this.unleashService.updateContext({
      properties: {
        country: this.selectedCountry()
      }
    });

    // Check experiment status after context update
    setTimeout(() => {
      this.checkExperiment();
    }, 100);
  }

  private checkExperiment() {
    const variant = this.unleashService.getVariant('pricing-experiment');
    
    this.experimentEnabled.set(variant.enabled);
    // If experiment is disabled, show control variant
    this.currentVariant.set(variant.enabled ? variant.name : 'control');
  }

  onCtaClick(plan: 'monthly' | 'yearly', variant: string) {
    // TODO: integrate the new Impact Metrics to track experiment performance
    
    console.log(`CTA Click - Plan: ${plan}, Variant: ${variant}, Country: ${this.selectedCountry()}`);
  }

  async simulateNewUser() {
    await this.unleashService.simulateNewUser();
    this.currentUserId.set(this.unleashService.getCurrentUserId());
    this.checkExperiment();
  }
}
