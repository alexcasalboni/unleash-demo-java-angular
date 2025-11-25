import { Routes } from '@angular/router';
import { KillSwitchComponent } from './components/kill-switch.component';
import { AbTestingComponent } from './components/ab-testing.component';
import { GradualRolloutComponent } from './components/gradual-rollout.component';
import { SettingsComponent } from './components/settings.component';

export const routes: Routes = [
  { path: '', component: KillSwitchComponent },
  { path: 'ab-testing', component: AbTestingComponent },
  { path: 'gradual-rollout', component: GradualRolloutComponent },
  { path: 'settings', component: SettingsComponent }
];
