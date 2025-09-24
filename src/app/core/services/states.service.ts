import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '@core/models/state.interface';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<State[]>('/api/states');
  }

  getById(acronym: string) {
    return this.http.get<State>(`/api/states/${acronym}`);
  }

  create(data: Partial<State>) {
    if (!data.acronym) {
      delete data.acronym;
    }
    return this.http.post('/api/states', data);
  }

  update(data: State) {
    return this.http.put(`/api/states/${data.acronym}`, data);
  }

  delete(acronym: string) {
    return this.http.delete(`/api/states/${acronym}`);
  }
}
