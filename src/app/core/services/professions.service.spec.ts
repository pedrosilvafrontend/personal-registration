import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProfessionsService } from './professions.service';

describe('ProfessionsService', () => {
  let service: ProfessionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ProfessionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
