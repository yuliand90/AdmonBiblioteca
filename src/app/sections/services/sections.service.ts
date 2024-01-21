import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section } from '../models/sections.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SeccionService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/secciones/';
  }

  loadSeccions(): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  loadSeccion(id: string): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  addSeccion(seccion: Section): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, seccion);
  }
  updateSeccion(id: string, seccion: Section): Observable<Section> {
    return this.http.put<Section>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      seccion
    );
  }
  deleteSeccion(idSeccion: string): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${idSeccion}`);
  }
}
