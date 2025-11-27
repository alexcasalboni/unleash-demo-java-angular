import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnleashService } from '../services/unleash.service';

@Component({
  selector: 'app-pricing-experiment',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
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
                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
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
                <button class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg">
                  Claim This Deal! 🚀
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
                <button class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg">
                  Claim This Deal! 🚀
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
                <button class="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
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
                    Save $58 compared to monthly! 💰
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
                <button class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-lg transition duration-200 shadow-xl text-lg">
                  Choose Yearly & Save! 🎯
                </button>
              </div>
            </div>
          </div>
        }

        <!-- Demo Control Panel (Combined) -->
        <div class="max-w-5xl mx-auto mb-12 mt-12 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg shadow-lg">
          <!-- Header -->
          <div class="bg-blue-100 dark:bg-blue-900/40 px-6 py-4 border-b border-blue-300 dark:border-blue-700">
            <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-300 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              Demo Controls & Information
            </h3>
          </div>

          <div class="p-6">
            <!-- Country Selector and Status Side by Side -->
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <!-- Country Selector -->
              <div>
                <label for="country" class="block text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                  Select Country (User Context):
                </label>
                <select
                  id="country"
                  [(ngModel)]="selectedCountry"
                  (change)="onCountryChange()"
                  class="w-full px-4 py-2 border border-blue-300 dark:border-blue-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="DE">Germany (DE)</option>
                  <option value="IT">Italy (IT)</option>
                  <option value="FR">France (FR)</option>
                  <option value="ES">Spain (ES)</option>
                  <option value="UK">United Kingdom (UK)</option>
                  <option value="US">United States (US)</option>
                </select>
                <p class="mt-2 text-xs text-blue-700 dark:text-blue-400">
                  Simulates user context for targeting
                </p>
              </div>

              <!-- Experiment Status -->
              <div>
                <label class="block text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                  Experiment Status:
                </label>
                @if (experimentEnabled()) {
                  <div class="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-md p-3">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      <div>
                        <p class="text-sm font-medium text-green-800 dark:text-green-300">
                          Active
                        </p>
                        <p class="text-xs text-green-600 dark:text-green-400">
                          Variant: <span class="font-semibold">{{ currentVariant() }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                } @else {
                  <div class="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-3">
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      Not enabled for this country
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Showing control variant
                    </p>
                  </div>
                }
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-blue-200 dark:border-blue-800 my-6"></div>

            <!-- About This Experiment -->
            <div>
              <h4 class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3">
                💡 About This Experiment
              </h4>
              <ul class="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                <li class="flex items-start">
                  <span class="font-semibold mr-2 min-w-[80px]">Control:</span>
                  <span>Standard pricing layout with equal emphasis on both plans</span>
                </li>
                <li class="flex items-start">
                  <span class="font-semibold mr-2 min-w-[80px]">Promo V1:</span>
                  <span>Discount banner with 20% off and attention-grabbing CTAs</span>
                </li>
                <li class="flex items-start">
                  <span class="font-semibold mr-2 min-w-[80px]">Promo V2:</span>
                  <span>Emphasizes yearly plan with bold colors and prominent savings</span>
                </li>
                <li class="flex items-start">
                  <span class="font-semibold mr-2 min-w-[80px]">Targeting:</span>
                  <span>Enabled only for specific countries (configured in Unleash)</span>
                </li>
                <li class="flex items-start">
                  <span class="font-semibold mr-2 min-w-[80px]">Context:</span>
                  <span>Frontend provides country code, Unleash handles targeting logic</span>
                </li>
              </ul>
            </div>
          </div>
          </div>


        <!-- Feature Flags Configuration -->
        <div class="bg-white dark:bg-gray-800 p-8 mb-8 rounded-lg shadow-xl border-t-4 border-unleash dark:border-blue-500 transition-colors">
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
                <td class="p-4 font-mono text-unleash dark:text-blue-400 font-semibold transition-colors">pricing-experiment</td>
                <td class="p-4 text-gray-800 dark:text-gray-300 transition-colors">
                  <span class="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-xl text-xs font-semibold transition-colors">Experiment</span>

                </td>
                <td class="p-4 text-gray-800 dark:text-gray-300 transition-colors">
                  A/B test with three variants (control, promo_v1, promo_v2) to optimize pricing page conversion. Uses context-based targeting to enable only for specific countries.
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Info Message -->
          <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500 rounded transition-colors">
            <p class="text-blue-700 dark:text-blue-300 m-0 transition-colors">
              <strong>💡 Experiment with Variants & Context</strong> - This experiment uses variants to test different pricing layouts and context-based targeting to enable only for specific countries. The frontend provides user context (country), while Unleash handles all targeting logic.
            </p>
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

  constructor(private unleashService: UnleashService) {}

  ngOnInit() {
    this.unleashService.start().then(() => {
      this.checkExperiment();
    });

    // Listen for Unleash updates
    this.unleashService.on('update', () => {
      this.checkExperiment();
    });
  }

  onCountryChange() {
    // Generate a random userId to simulate a new user (avoids stickiness)
    const randomUserId = `user-${Math.random().toString(36).substring(2, 15)}`;
    
    // Update Unleash context with new country and random user
    this.unleashService.updateContext({
      userId: randomUserId,
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
}
