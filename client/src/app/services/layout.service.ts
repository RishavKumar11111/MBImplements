import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { serverURL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private title: string = '';
  private titleSubject: BehaviorSubject<string> = new BehaviorSubject(this.title);
  public currentTitle: Observable<string>;

  private breadcrumbs: Array<string> = [];
  private breadcrumbsSubject: BehaviorSubject<Array<string>> = new BehaviorSubject(this.breadcrumbs);
  public currentBreadcrumbs: Observable<Array<string>>;

  constructor(
    private http: HttpClient
  ) {
    this.currentTitle = this.titleSubject.asObservable();
    this.currentBreadcrumbs = this.breadcrumbsSubject.asObservable();
  }

  public setTitle(title: string) {
    this.titleSubject.next(title);
  }

  public setBreadcrumbs(breadcrumbs: Array<string>) {
    this.breadcrumbsSubject.next(breadcrumbs);
  }
}