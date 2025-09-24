import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataInfo } from '@core/models/data-info.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);

  getData() {
    return this.http.get<DataInfo[]>('/api/data');
  }

  getById(id: string) {
    return this.http.get<DataInfo>(`/api/data/${id}`);
  }

  create(data: Partial<DataInfo>) {
    if (!data.id) {
      delete data.id;
    }
    return this.http.post('/api/data', data);
  }

  update(data: DataInfo) {
    return this.http.put(`/api/data/${data.id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`/api/data/${id}`);
  }
}
