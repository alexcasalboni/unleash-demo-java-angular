import { Injectable } from '@angular/core';
import { UnleashClient, IContext, IVariant } from 'unleash-proxy-client';
import { unleashConfig } from '../config/unleash.config';

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

  async start(): Promise<void> {
    return this.initialize();
  }

  isEnabled(featureName: string): boolean {
    return this.unleash.isEnabled(featureName);
  }

  getVariant(featureName: string): IVariant {
    return this.unleash.getVariant(featureName);
  }

  updateContext(context: Partial<IContext>): Promise<void> {
    // Don't include appName in context updates - it's static and set during initialization
    // Only pass dynamic context fields like userId, sessionId, remoteAddress, and properties
    const { appName, environment, ...dynamicContext } = context;
    return this.unleash.updateContext(dynamicContext as IContext);
  }

  on(event: string, callback: () => void): void {
    this.unleash.on(event, callback);
  }

  onUpdate(callback: () => void): void {
    this.unleash.on('update', callback);
  }
}
