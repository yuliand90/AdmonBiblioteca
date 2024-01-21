import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/books.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/libros/';
  }

  loadBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  loadBooksAvailable(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.myAppUrl}${this.myApiUrl}disponibles`);
  }
  loadBooksByUser(id: string): Observable<Book[]> {
    return this.http.get<Book[]>(
      `${this.myAppUrl}${this.myApiUrl}usuario/${id}`
    );
  }
  loadBook(id: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, book);
  }
  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.myAppUrl}${this.myApiUrl}${id}`, book);
  }
  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
