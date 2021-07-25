import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverURL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfmrdcService {
  constructor(
    private http: HttpClient
  ) { }
}