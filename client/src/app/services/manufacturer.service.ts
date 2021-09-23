import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  serverURL: string = environment.serverURL;
  constructor(
    private http: HttpClient
  ) { }

  getAllImplements(): Observable<any> {
    return this.http.get(`${this.serverURL}/manufacturer/getAllImplements`);
  }

  getUniqueFarmIDYear(): Observable<any> {
    return this.http.get(`${this.serverURL}/manufacturer/getUniqueFarmIDYear`, {
      withCredentials: true
    });
  }

  getStockSerialNos(implementID: number): Observable<any> {
    return this.http.get(`${this.serverURL}/manufacturer/getStockSerialNos/${implementID}`, {
      withCredentials: true
    });
  }

  submitStockSerialNos(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/manufacturer/submitStockSerialNos`, data, {
      withCredentials: true
    });
  }
}