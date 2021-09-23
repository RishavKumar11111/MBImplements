import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  serverURL: string = environment.serverURL;
  constructor(
    private http: HttpClient
  ) { }

  getAllImplements(): Observable<any> {
    return this.http.get(`${this.serverURL}/admin/getAllImplements`);
  }

  getFinancialYear(): Observable<any> {
    return this.http.get(`${this.serverURL}/admin/getFinancialYear`);
  }

  getImplementTargets(implementID: number, financialYear: string): Observable<any> {
    return this.http.get(`${this.serverURL}/admin/getImplementTargets/${implementID}/${financialYear}`);
  }

  submitImplementTarget(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/admin/submitImplementTarget`, data, {
      withCredentials: true
    });
  }

  updateImplementTarget(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/admin/updateImplementTarget`, data, {
      withCredentials: true
    });
  }

  getAllImplementPrices(): Observable<any> {
    return this.http.get(`${this.serverURL}/admin/getAllImplementPrices`);
  }

  submitImplementPrice(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/admin/submitImplementPrice`, data, {
      withCredentials: true
    });
  }

  updateImplementPrice(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/admin/updateImplementPrice`, data, {
      withCredentials: true
    });
  }

  submitActivatedImplements(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/admin/submitActivatedImplements`, data, {
      withCredentials: true
    });
  }

  getAllManufacturerDetails(): Observable<any> {
    return this.http.get(`${this.serverURL}/admin/getAllManufacturerDetails`);
  }

  approveRejectManufacturerRecords(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/admin/approveRejectManufacturerRecords`, data, {
      withCredentials: true
    });
  }
}