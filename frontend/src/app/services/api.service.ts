import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../models/users.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private usernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

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

  validToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<boolean>('http://localhost:8080/auth/token-valid', {
      headers,
    });
  }

  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    const payload = this.decodeJWT(token);
    return payload?.sub || null;
  }

  private decodeJWT(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }

  updateUsername() {
    const username = this.getUsername();
    this.usernameSubject.next(username);
  }

  getUseranmeObservable(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }
}
