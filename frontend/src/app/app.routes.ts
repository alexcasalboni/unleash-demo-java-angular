import { Routes } from '@angular/router';
import { KillSwitchComponent } from './kill-switch.component';
import { AbTestingComponent } from './ab-testing.component';
import { GradualRolloutComponent } from './gradual-rollout.component';
import { SettingsComponent } from './settings.component';

export const routes: Routes = [
  { path: '', component: KillSwitchComponent },
  { path: 'ab-testing', component: AbTestingComponent },
  { path: 'gradual-rollout', component: GradualRolloutComponent },
  { path: 'settings', component: SettingsComponent }
];
