import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { StatesService } from './states.service';
import { provideHttpClient } from '@angular/common/http';
import { State } from '@core/models/state.interface';

describe('StatesService', () => {
  let service: StatesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(StatesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make an HTTP GET request in getAll()', () => {
    const mockData: State[] = [
      { "acronym": "DF", "name": "Distrito Federal" },
      { "acronym": "ES", "name": "Espírito Santo" },
      { "acronym": "GO", "name": "Goiás" }
    ];

    service.getAll().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/api/states');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should make an HTTP GET request with the correct ID in getById()', () => {
    const id = '123';
    const mockData: State = { "acronym": "DF", "name": "Distrito Federal" };

    service.getById(id).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`/api/states/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should make an HTTP POST request with the correct payload in create()', () => {
    const mockData: State = { "acronym": "SC", "name": "Santa Catarina" };

    service.create(mockData).subscribe(response => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne('/api/states');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockData);
    req.flush(mockData);
  });

  it('should make an HTTP PUT request with the correct URL and payload in update()', () => {
    const mockData: State = { "acronym": "SC", "name": "Santa Catarina" };

    service.update(mockData).subscribe(response => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne(`/api/states/${mockData.acronym}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockData);
    req.flush(mockData);
  });

  it('should make an HTTP DELETE request for the correct acronym in delete()', () => {
    const acronym = '123';

    service.delete(acronym).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`/api/states/${acronym}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
