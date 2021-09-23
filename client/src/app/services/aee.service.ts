import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AeeService {
  serverURL: string = environment.serverURL;
  constructor(
    private http: HttpClient
  ) { }

  getManufacturerStockSerialNos(): Observable<any> {
    return this.http.get(`${this.serverURL}/aee/getManufacturerStockSerialNos`, {
      withCredentials: true
    });
  }

  approveRejectStockSerialNos(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/aee/approveRejectStockSerialNos`, data, {
      withCredentials: true
    });
  }
}