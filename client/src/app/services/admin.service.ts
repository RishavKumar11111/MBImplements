import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverURL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  getAllImplements(): Observable<any> {
    return this.http.get(`${serverURL}/admin/getAllImplements`);
  }

  getFinancialYear(): Observable<any> {
    return this.http.get(`${serverURL}/admin/getFinancialYear`);
  }

  getDistrictTargets(implementID: any, financialYear: any): Observable<any> {
    return this.http.get(`${serverURL}/admin/getDistrictTargets/${implementID}/${financialYear}`);
  }

  submitDistrictTarget(data: any): Observable<any> {
    return this.http.post(`${serverURL}/admin/submitDistrictTarget`, data, {
      withCredentials: true
    });
  }

  updateDistrictTarget(data: any): Observable<any> {
    return this.http.post(`${serverURL}/admin/updateDistrictTarget`, data, {
      withCredentials: true
    });
  }

  getAllImplementPrices(): Observable<any> {
    return this.http.get(`${serverURL}/admin/getAllImplementPrices`);
  }

  submitImplementPrice(data: any): Observable<any> {
    return this.http.post(`${serverURL}/admin/submitImplementPrice`, data, {
      withCredentials: true
    });
  }

  updateImplementPrice(data: any): Observable<any> {
    return this.http.post(`${serverURL}/admin/updateImplementPrice`, data, {
      withCredentials: true
    });
  }
}