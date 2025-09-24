import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Record } from './record';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { provideNgxMask } from 'ngx-mask';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../../app.config';
import { ptBR } from  'date-fns/locale';
import { of } from 'rxjs';
import { routes } from '../../app.routes';
import { ProfessionsStore } from '@core/stores/professions.store';
import { StatesStore } from '@core/stores/states.store';
import { MatSnackBar } from '@angular/material/snack-bar';

const activatedRouteProvide = {
  provide: ActivatedRoute,
  useValue:
    {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1')
        }
      }
    }
}

const professionsStoreMock = {
  professions: jest.fn().mockReturnValue([]),
  loading: jest.fn().mockReturnValue(false),
  error: jest.fn().mockReturnValue(null),
  loadAll: jest.fn()
};

const statesStoreMock = {
  states: jest.fn().mockReturnValue([]),
  loading: jest.fn().mockReturnValue(false),
  error: jest.fn().mockReturnValue(null),
  loadAll: jest.fn()
};

describe('Record', () => {
  let component: Record;
  let fixture: ComponentFixture<Record>;
  const fillForm = (component: Record, data?: any) => {
    component.personalForm.patchValue({
      fullName: 'John Doe',
      birthDate: '1996-05-06T03:00:00.000Z',
      cpf: '62008188000',
      phone: '1234567890',
      ...(data || {})
    }, { emitEvent: false, onlySelf: true });

    component.residentialForm.patchValue({
      address: '123 Main St',
      neighborhood: 'Anytown',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345678',
      ...(data || {})
    });

    component.professionalForm.patchValue({
      company: 'Example Inc.',
      profession: 'Software Engineer',
      salary: 100000,
      ...(data || {})
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Record,
        RouterModule.forRoot(routes)
      ],
      providers: [
        { provide: ProfessionsStore, useValue: professionsStoreMock },
        { provide: StatesStore, useValue: statesStoreMock },
        activatedRouteProvide,
        {
          provide: HttpClient, useValue: {
            get: jest.fn().mockReturnValue(of({})),
            post: jest.fn().mockReturnValue(of({})),
            put: jest.fn().mockReturnValue(of({})),
            delete: jest.fn().mockReturnValue(of({}))
          }
        },
        provideDateFnsAdapter(),
        { provide: MatSnackBar, useValue: { open: jest.fn() } },
        { provide: MAT_DATE_LOCALE, useValue: ptBR },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
        provideNgxMask()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Record);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call update method on submit if valid form', () => {
    component.id = '1';
    const spyUpdate = jest.spyOn(component['dataService'], 'update');
    component.submit();
    expect(spyUpdate).not.toHaveBeenCalled();
    fillForm(component);

    component.submit();

    expect(spyUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1'
      })
    )
  })

  it('should call create method on submit if valid form', () => {
    const createSpy = jest.spyOn(component['dataService'], 'create');
    component.id = null;
    const cpf = '28191995000';
    fillForm(component, { cpf });
    component.submit();
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        personal: expect.objectContaining({
          cpf: cpf
        })
      })
    )
  });
});
