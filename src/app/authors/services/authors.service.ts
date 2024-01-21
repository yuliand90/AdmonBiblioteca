import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from 'src/app/authors/models/authors.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/autores/';
  }

  loadAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  loadAuthorsInfo(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.myAppUrl}${this.myApiUrl}/info`);
  }
  loadAuthor(cedula: string): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.myAppUrl}${this.myApiUrl}${cedula}`);
  }
  addAuthor(author: Author): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, author);
  }
  updateAuthor(cedula: string, autor: Author): Observable<Author> {
    return this.http.put<Author>(
      `${this.myAppUrl}${this.myApiUrl}${cedula}`,
      autor
    );
  }
  deleteAuthor(cedula: string): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${cedula}`);
  }
}
