import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navigation', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navigation')).toBeTruthy();
  });

  describe('Routing', () => {
    it('should navigate to UI-Only component by default', async () => {
      const router = TestBed.inject(Router);
      const location = TestBed.inject(Location);
      const fixture = TestBed.createComponent(App);
      
      await router.navigate(['']);
      fixture.detectChanges();
      await fixture.whenStable();
      
      expect(location.path()).toBe('');
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('app-ui-only')).toBeTruthy();
    });

    it('should navigate to kill-switch component', async () => {
      const router = TestBed.inject(Router);
      const location = TestBed.inject(Location);
      const fixture = TestBed.createComponent(App);
      
      await router.navigate(['kill-switch']);
      fixture.detectChanges();
      await fixture.whenStable();
      
      expect(location.path()).toBe('/kill-switch');
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('app-kill-switch')).toBeTruthy();
    });

    it('should navigate to recommendations component', async () => {
      const router = TestBed.inject(Router);
      const location = TestBed.inject(Location);
      const fixture = TestBed.createComponent(App);
      
      await router.navigate(['recommendations']);
      fixture.detectChanges();
      await fixture.whenStable();
      
      expect(location.path()).toBe('/recommendations');
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('app-recommendations')).toBeTruthy();
    });

    it('should navigate to pricing-experiment component', async () => {
      const router = TestBed.inject(Router);
      const location = TestBed.inject(Location);
      const fixture = TestBed.createComponent(App);
      
      await router.navigate(['pricing-experiment']);
      fixture.detectChanges();
      await fixture.whenStable();
      
      expect(location.path()).toBe('/pricing-experiment');
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('app-pricing-experiment')).toBeTruthy();
    });
  });
});
