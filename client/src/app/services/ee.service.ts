import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverURL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EeService {
  constructor(
    private http: HttpClient
  ) { }

  getEEDistricts(): Observable<any> {
    return this.http.get(`${serverURL}/ee/getEEDistricts`, {
      withCredentials: true
    });
  }

  getImplementStockDetails(districtCode: number): Observable<any> {
    return this.http.get(`${serverURL}/ee/getImplementStockDetails/${districtCode}`, {
      withCredentials: true
    });
  }

  submitStockAvailability(data: any): Observable<any> {
    return this.http.post(`${serverURL}/ee/submitStockAvailability`, data, {
      withCredentials: true
    });
  }

  getImplementsStockSerialNos(districtCode: number): Observable<any> {
    return this.http.get(`${serverURL}/ee/getImplementsStockSerialNos/${districtCode}`, {
      withCredentials: true
    });
  }

  getBlocks(districtCode: number): Observable<any> {
    return this.http.get(`${serverURL}/ee/getBlocks/${districtCode}`);
  }

  submitStockInitialisation(data: any): Observable<any> {
    return this.http.post(`${serverURL}/ee/submitStockInitialisation`, data, {
      withCredentials: true
    });
  }
}