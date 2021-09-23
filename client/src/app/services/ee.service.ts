import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EeService {
  serverURL: string = environment.serverURL;
  constructor(
    private http: HttpClient
  ) { }

  getEEDistricts(): Observable<any> {
    return this.http.get(`${this.serverURL}/ee/getEEDistricts`, {
      withCredentials: true
    });
  }

  getImplementStockDetails(districtCode: number): Observable<any> {
    return this.http.get(`${this.serverURL}/ee/getImplementStockDetails/${districtCode}`, {
      withCredentials: true
    });
  }

  submitStockAvailability(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/ee/submitStockAvailability`, data, {
      withCredentials: true
    });
  }

  getImplementsStockSerialNos(districtCode: number): Observable<any> {
    return this.http.get(`${this.serverURL}/ee/getImplementsStockSerialNos/${districtCode}`, {
      withCredentials: true
    });
  }

  getBlocks(districtCode: number): Observable<any> {
    return this.http.get(`${this.serverURL}/ee/getBlocks/${districtCode}`);
  }

  submitStockInitialisation(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/ee/submitStockInitialisation`, data, {
      withCredentials: true
    });
  }
}