import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { serverURL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // captchSource = new BehaviorSubject(null);
  // captchStatus = this.captchSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  // setCaptchaStatus(code: any) {
  //   this.captchSource.next(code);
  // };

  setRole(role: string) {
    return localStorage.setItem('role', role);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  setUsername(username: string) {
    return localStorage.setItem('username', username);
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  clearLocalStorage() {
    localStorage.clear();
    return true;
  }

  generateCaptchaAndSalt(type: any, length: any): Observable<any> {
    return this.http.get(`${serverURL}/auth/generateCaptchaAndSalt/${type}/${length}`, {
      withCredentials: true
    });
  }

  signIn(data: any): Observable<any> {
    return this.http.post(`${serverURL}/auth/signIn`, data, {
      withCredentials: true
    });
  }

  getUserDetails(role: string): Observable<any> {
    return this.http.get(`${serverURL}/auth/getUserDetails/${role}/${this.getUsername()}`, {
      withCredentials: true
    });
  }

  signOut(): Observable<any> {
    return this.http.post(`${serverURL}/auth/signOut`, {
    }, {
      withCredentials: true
    });
  }
}