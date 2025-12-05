import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  private getHeaders(userId?: string): HttpHeaders {
    let headers = new HttpHeaders();
    if (userId) {
      headers = headers.set('X-Unleash-User-Id', userId);
    }
    return headers;
  }

  getTestMessage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/test`);
  }

  generateReport(userId?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/reports`, { 
      headers: this.getHeaders(userId) 
    });
  }

  getRecommendations(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/recommendations`, {
      headers: this.getHeaders(userId)
    });
  }
}
