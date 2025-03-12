import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('auth_token');

    this.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getJobs(): Observable<any> {
    const headers = this.headers;
    return this.http.get(`${this.apiUrl}/jobs`, { headers });
  }

  fetchNewJobs() {
    const headers = this.headers;
    return this.http.get(`${this.apiUrl}/fetchNewJobs`, { headers });
  }

  postJob(job: { title: string; description: string; email: string }) {
    return this.http.post(`${this.apiUrl}/jobs`, job);
  }

  approveJob(jobId: number) {
    return this.http.post(`${this.apiUrl}/jobs/${jobId}/approve`, {});
  }

  markJobAsSpam(jobId: number) {
    return this.http.post(`${this.apiUrl}/jobs/${jobId}/spam`, {});
  }
}
