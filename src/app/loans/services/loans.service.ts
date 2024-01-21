import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loan } from 'src/app/loans/models/loans.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoansService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/prestamos/';
  }

  loadLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  loadLoan(id_pres: string): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.myAppUrl}${this.myApiUrl}${id_pres}`);
  }
  addLoan(loan: Loan): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, loan);
  }
  updateLoan(id_pres: string, loan: Loan): Observable<Loan> {
    return this.http.put<Loan>(
      `${this.myAppUrl}${this.myApiUrl}${id_pres}`,
      loan
    );
  }
  deleteLoan(id_pres: string): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id_pres}`);
  }
}
