import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverURL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(
    private http: HttpClient
  ) { }

  generateCaptchaAndSalt(type: number, length: number): Observable<any> {
    return this.http.get(`${serverURL}/auth/generateCaptchaAndSalt/${type}/${length}`, {
      withCredentials: true
    });
  }

  getFarmerDetails(farmerID: string): Observable<any> {
    return this.http.get(`https://apicol.nic.in/api/FarmerData?farmerID=${farmerID}`);
  }

  getDistricts(): Observable<any> {
    return this.http.get(`${serverURL}/getDistricts`);
  }

  getBlocks(districtCode: number): Observable<any> {
    return this.http.get(`${serverURL}/getBlocks/${districtCode}`);
  }

  getGPs(blockCode: number): Observable<any> {
    return this.http.get(`${serverURL}/getGPs/${blockCode}`);
  }

  getVillages(gpCode: number): Observable<any> {
    return this.http.get(`${serverURL}/getVillages/${gpCode}`);
  }

  getFarmerAddress(villageCode: number): Observable<any> {
    return this.http.get(`${serverURL}/getFarmerAddress/${villageCode}`);
  }

  getImplementDetails(): Observable<any> {
    return this.http.get(`${serverURL}/getImplementDetails`);
  }

  submitFarmerBooking(data: any): Observable<any> {
    return this.http.post(`${serverURL}/submitFarmerBooking`, data, {
      withCredentials: true
    });
  }

  checkProprietorEmailIDAvailability(proprietorEmailID: string): Observable<any> {
    return this.http.get(`${serverURL}/checkProprietorEmailIDAvailability/${proprietorEmailID}`);
  }

  checkUniqueFarmIDAvailability(uniqueFarmID: string): Observable<any> {
    return this.http.get(`${serverURL}/checkUniqueFarmIDAvailability/${uniqueFarmID}`);
  }

  submitManufacturerDetails(data: any): Observable<any> {
    return this.http.post(`${serverURL}/submitManufacturerDetails`, data, {
      withCredentials: true
    });
  }
}