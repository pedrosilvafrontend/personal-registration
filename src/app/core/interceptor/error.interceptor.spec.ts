import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let snackSpy: { open: jest.Mock };

  beforeEach(() => {
    snackSpy = { open: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: MatSnackBar, useValue: snackSpy },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should show snackbar and rethrow error on HTTP error', (done) => {
    http.get('/api/test').subscribe({
      next: () => fail('should error'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(snackSpy.open).toHaveBeenCalled();
        const [message, action] = (snackSpy.open.mock.calls.at(-1) || []) as [string, string];
        expect(typeof message).toBe('string');
        expect(action).toBe('ok');
        done();
      }
    });

    const req = httpMock.expectOne('/api/test');
    req.flush({ error: 'failure' }, { status: 500, statusText: 'Server Error' });
  });
});
