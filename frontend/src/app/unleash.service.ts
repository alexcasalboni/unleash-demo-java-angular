import { Injectable } from '@angular/core';
import { UnleashClient } from 'unleash-proxy-client';
import { unleashConfig } from './unleash.config';

@Injectable({
  providedIn: 'root'
})
export class UnleashService {
  private unleash: UnleashClient;
  private initialized = false;

  constructor() {
    this.unleash = new UnleashClient({
      url: unleashConfig.url,
      clientKey: unleashConfig.clientKey,
      appName: unleashConfig.appName,
      refreshInterval: unleashConfig.refreshInterval
    });
  }

  async initialize(): Promise<void> {
    if (!this.initialized) {
      await this.unleash.start();
      this.initialized = true;
    }
  }

  isEnabled(featureName: string): boolean {
    return this.unleash.isEnabled(featureName);
  }

  onUpdate(callback: () => void): void {
    this.unleash.on('update', callback);
  }
}
