import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { provideLocationMocks } from '@angular/common/testing';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingHarness } from '@angular/router/testing';
import { render, screen } from '@testing-library/angular';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { provideNgxMask } from 'ngx-mask';
import { Record } from './pages/record/record';

describe('App', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterModule.forRoot(routes)],
      providers: [
        provideRouter([]),
        { provide: Location, useValue: provideLocationMocks() },
        provideHttpClient(),
        provideDateFnsAdapter(),
        provideNgxMask()
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(App);
    router.initialNavigation();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render menu component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-menu')).toBeTruthy();
  });

  it('should render the List component for the /list route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/list');
    expect(screen.getByText('Listagem')).toBeTruthy();
  });

  it('should render record component when navigating to "/record"', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/record');
    expect(screen.getByText('Cadastrar')).toBeTruthy();
  });

  it('should render record component when navigating to "/record/:id"', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/record/1');
    expect(screen.getByText('Cadastrar')).toBeTruthy();
  });
});
