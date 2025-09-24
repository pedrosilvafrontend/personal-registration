import { TestBed } from '@angular/core/testing';

import { AddressService } from './address.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn().mockReturnValue(Promise.resolve({}))
          }
        }
      ],
    });
    service = TestBed.inject(AddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called with correct URL', () => {
    service.getByCep('01001000');
    expect(service['http'].get).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/addresses\/\d+/)
    );
  });
});
