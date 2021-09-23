import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // captchSource = new BehaviorSubject(null);
  // captchStatus = this.captchSource.asObservable();
  serverURL: string = environment.serverURL;
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

  generateCaptchaAndSalt(type: number, length: number): Observable<any> {
    return this.http.get(`${this.serverURL}/auth/generateCaptchaAndSalt/${type}/${length}`, {
      withCredentials: true
    });
  }

  signIn(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/auth/signIn`, data, {
      withCredentials: true
    });
  }

  getUserDetails(role: string): Observable<any> {
    return this.http.get(`${this.serverURL}/auth/getUserDetails/${role}/${this.getUsername()}`, {
      withCredentials: true
    });
  }

  signOut(): Observable<any> {
    return this.http.post(`${this.serverURL}/auth/signOut`, {
    }, {
      withCredentials: true
    });
  }
}