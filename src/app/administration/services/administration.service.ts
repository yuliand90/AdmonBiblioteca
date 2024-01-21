import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Administration } from '../models/administration.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/usuarios/';
  }

  loadAdministrator(): Observable<Administration[]> {
    return this.http.get<Administration[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  loadAdministrationInfo(): Observable<Administration[]> {
    return this.http.get<Administration[]>(
      `${this.myAppUrl}${this.myApiUrl}/students`
    );
  }

  loadAdmin(username: string): Observable<Administration[]> {
    return this.http.get<Administration[]>(
      `${this.myAppUrl}${this.myApiUrl}${username}`
    );
  }
  addAdmin(administration: Administration): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, administration);
  }
  updateAdministrador(
    cedula: string,
    administration: Administration
  ): Observable<Administration> {
    return this.http.put<Administration>(
      `${this.myAppUrl}${this.myApiUrl}${cedula}`,
      administration
    );
  }
  deleteAdministrator(cedula: string): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${cedula}`);
  }
  IsLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  GetUserRole() {
    return sessionStorage.getItem('userrole') != null
      ? sessionStorage.getItem('userrole')?.toString()
      : '';
  }
}
