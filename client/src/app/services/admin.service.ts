import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverURL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private http: HttpClient
  ) { }

  getAllImplements(): Observable<any> {
    return this.http.get(`${serverURL}/admin/getAllImplements`);
  }

  getFinancialYear(): Observable<any> {
    return this.http.get(`${serverURL}/admin/getFinancialYear`);
  }

  getImplementTargets(implementID: number, financialYear: string): Observable<any> {
    return this.http.get(`${serverURL}/admin/getImplementTargets/${implementID}/${financialYear}`);
  }

  submitImplementTarget(data: any): Observable<any> {
    return this.http.post(`${serverURL}/admin/submitImplementTarget`, data, {
      withCredentials: true
    });
  }

  updateImplementTarget(data: any): Observable<any> {
    return this.http.post(`${serverURL}/admin/updateImplementTarget`, data, {
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

  submitActivatedImplements(data: any): Observable<any> {
    return this.http.post(`${serverURL}/admin/submitActivatedImplements`, data, {
      withCredentials: true
    });
  }
}