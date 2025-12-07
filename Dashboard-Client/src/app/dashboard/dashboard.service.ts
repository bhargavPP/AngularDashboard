// src/app/dashboard/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private base = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getTiles(): Observable<any> {
    return this.http.get(`${this.base}/tiles`);
  }

  getProducts(page = 1, pageSize = 20): Observable<any> {
    return this.http.get(`${this.base}/products?page=${page}&pageSize=${pageSize}`);
  }
}
