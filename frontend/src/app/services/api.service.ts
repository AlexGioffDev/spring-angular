import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getMessage(): Observable<string> {
    return this.http.get('http://localhost:8080/', { responseType: 'text' });
  }

  createUser(user: Users): Observable<Users> {
    return this.http.post<Users>('http://localhost:8080/auth/register', user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  login(user: Users): Observable<string> {
    return this.http.post('http://localhost:8080/auth/login', user, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text',
    }) as Observable<string>;
  }

  privateData(): Observable<string> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get('http://localhost:8080/private', {
      headers,
      responseType: 'text',
    });
  }
}
