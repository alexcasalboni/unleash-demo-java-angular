import { Routes } from '@angular/router';
import { UiOnlyComponent } from './components/ui-only.component';
import { KillSwitchComponent } from './components/kill-switch.component';
import { RecommendationsComponent } from './components/recommendations.component';
import { PricingExperimentComponent } from './components/pricing-experiment.component';

export const routes: Routes = [
  { path: '', component: UiOnlyComponent },
  { path: 'kill-switch', component: KillSwitchComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'pricing-experiment', component: PricingExperimentComponent }
];
