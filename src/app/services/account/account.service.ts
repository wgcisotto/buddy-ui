import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from 'src/app/models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private reportUrl = '/v1/account';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Account[]>{
    const url = `${this.reportUrl}`;
    return this.http.get<Account[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Account[]>('AccountService => getAll()', null))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

