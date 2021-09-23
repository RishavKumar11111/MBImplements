import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OsicService {
  constructor(
    private http: HttpClient
  ) { }
}