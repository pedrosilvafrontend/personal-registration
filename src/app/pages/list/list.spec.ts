import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { List } from './list';
import { DialogService } from '@core/services/dialog.service';
import { DataService } from '@core/services/data.service';


describe('List', () => {
  let component: List;
  let fixture: ComponentFixture<List>;

  const dialogServiceMock = {
    confirm: jest.fn().mockReturnValue(of(true))
  } as Partial<DialogService> as DialogService;
  const dataServiceMock = {
    delete: jest.fn().mockReturnValue(of({})),
    getData: jest.fn().mockReturnValue(of([]))
  } as Partial<DataService> as DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [List],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: DialogService, useValue: dialogServiceMock },
        { provide: DataService, useValue: dataServiceMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete item after confirmation', () => {
    component.dataSource = [{ id: '1', fullName: 'John' } as any];
    component.delete(component.dataSource[0]);
    expect(dialogServiceMock.confirm).toHaveBeenCalled();
    expect(dataServiceMock.delete).toHaveBeenCalledWith('1');
  });
});
