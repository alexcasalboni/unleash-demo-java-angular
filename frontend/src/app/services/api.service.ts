import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getTestMessage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/test`);
  }

  generateReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/reports`);
  }

  getRecommendations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/recommendations`);
  }
}
