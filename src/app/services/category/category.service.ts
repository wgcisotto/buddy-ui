import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from './../../models/Category';
import { MovementType } from './../../models/enums/MovementType';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private reportUrl = '/v1/category';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]>{
    const url = `${this.reportUrl}`;
    return this.http.get<Category[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Category[]>('CategoryService => getAll()', null))
    );
  }

  getAllByType(type: MovementType): Observable<Category[]>{
    const url = `${this.reportUrl}` + `?type=` + type;
    return this.http.get<Category[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Category[]>('CategoryService => getAll()', null))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
