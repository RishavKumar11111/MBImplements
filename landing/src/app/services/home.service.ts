import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  serverURL: string = environment.serverURL;
  constructor(
    private http: HttpClient
  ) { }

  generateCaptchaAndSalt(type: number, length: number): Observable<any> {
    return this.http.get(`${this.serverURL}/auth/generateCaptchaAndSalt/${type}/${length}`, {
      withCredentials: true
    });
  }

  getFarmerDetails(farmerID: string): Observable<any> {
    return this.http.get(`https://mkuy.apicol.nic.in/api/FarmerData1/GetFarmerDetails?farmerID=${farmerID}&apiKey=4e6f7833f9aa5e58b872e515c5d77e427f88ec4dce341388daa2e6819230bb12`);
  }

  getDistricts(): Observable<any> {
    return this.http.get(`${this.serverURL}/getDistricts`);
  }

  getBlocks(districtCode: number): Observable<any> {
    return this.http.get(`${this.serverURL}/getBlocks/${districtCode}`);
  }

  getGPs(blockCode: number): Observable<any> {
    return this.http.get(`${this.serverURL}/getGPs/${blockCode}`);
  }

  getVillages(gpCode: number): Observable<any> {
    return this.http.get(`${this.serverURL}/getVillages/${gpCode}`);
  }

  getFarmerAddress(villageCode: number): Observable<any> {
    return this.http.get(`${this.serverURL}/getFarmerAddress/${villageCode}`);
  }

  getImplementDetails(): Observable<any> {
    return this.http.get(`${this.serverURL}/getImplementDetails`);
  }

  submitFarmerBooking(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/submitFarmerBooking`, data, {
      withCredentials: true
    });
  }

  checkProprietorEmailIDAvailability(proprietorEmailID: string): Observable<any> {
    return this.http.get(`${this.serverURL}/checkProprietorEmailIDAvailability/${proprietorEmailID}`);
  }

  checkUniqueFarmIDAvailability(uniqueFarmID: string): Observable<any> {
    return this.http.get(`${this.serverURL}/checkUniqueFarmIDAvailability/${uniqueFarmID}`);
  }

  submitManufacturerDetails(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/submitManufacturerDetails`, data, {
      withCredentials: true
    });
  }
}