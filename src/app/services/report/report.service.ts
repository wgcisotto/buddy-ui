import { AnnualReport } from './../../models/AnnualReport';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private reportUrl = '/v1/report';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  getReport (): Observable<Map<string, Map<string, number>>> {
    const url = `${this.reportUrl}`;
    return this.http.get<Map<string, Map<string, number>>>(url, this.httpOptions).pipe(
        catchError(this.handleError<Map<string, Map<string, number>>>('getReport', null))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


}
