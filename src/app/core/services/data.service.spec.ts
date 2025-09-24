import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data list', () => {
    const mock = [{ id: '1' } as any];
    service.getData().subscribe((res) => {
      expect(res).toEqual(mock);
    });
    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should fetch data by id', () => {
    const mock = { id: '1' } as any;
    service.getById('1').subscribe((res) => {
      expect(res).toEqual(mock);
    });
    const req = httpMock.expectOne('/api/data/1');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should create data and remove falsy id', () => {
    const payload: any = { id: undefined, name: 'x' };
    service.create(payload).subscribe();
    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.id).toBeUndefined();
    expect(req.request.body.name).toBe('x');
    req.flush({});
  });

  it('should update data', () => {
    const payload: any = { id: '10', name: 'x' };
    service.update(payload).subscribe();
    const req = httpMock.expectOne('/api/data/10');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    req.flush({});
  });

  it('should delete data', () => {
    service.delete('10').subscribe();
    const req = httpMock.expectOne('/api/data/10');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
