import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profession } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionsService {
  private http = inject(HttpClient);

  getAll(): Observable<Profession[]> {
    return this.http.get<Profession[]>('api/professions');
  }
}
