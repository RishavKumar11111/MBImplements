import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
serverURL: string = environment.serverURL;
  private array: Array<object> = [];
  private arraySource: BehaviorSubject<Array<object>> = new BehaviorSubject(this.array);
  public currentArray: Observable<Array<object>>;

  constructor(
    private http: HttpClient
  ) {
    this.currentArray = this.arraySource.asObservable();
  }

  changeMessage(array: Array<object>) {
    this.arraySource.next(array);
  }

  getStates(): Observable<any> {
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`);
  }

  getDistricts(state_id: number): Observable<any> {
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`);
  }

  getSlotAvailabilityByDistrictForWeek(districtID: number, date: any): Observable<any> {
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtID}&date=${date}`);
  }

  getSlotAvailabilityByPinForWeek(pinCode: number, date: any): Observable<any> {
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=${date}`);
  }
}