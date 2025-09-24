import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResidentialInfo } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private http = inject(HttpClient);

  getByCep(cep: string) {
    cep = [
      "01001-000",
      "20040-020",
      "30140-071",
      "40140-110",
      "80010-000",
      "69005-070",
      "60060-120",
      "73301-200",
      "88010-200",
      "96010-160"
    ][Math.floor(Math.random() * 10)];
    return this.http.get<ResidentialInfo>(`/api/addresses/${cep}`);
  }
}
