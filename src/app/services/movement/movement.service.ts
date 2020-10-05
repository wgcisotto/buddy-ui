import { Movement } from './../../models/Movement';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovementType } from 'src/app/models/enums/MovementType';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  private movementUrl = '/v1/movement';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  save(movement: Movement): Observable<Movement>{
    console.log("saving movement");
    const url = `${this.movementUrl}`;
    console.log(url);
    return this.http.post<Movement>(url, movement, this.httpOptions).pipe(
      catchError(this.handleError<Movement>('MovementService => save()'))
    );
  }

  getAll(): Observable<Movement[]>{
    const url = `${this.movementUrl}`;
    return this.http.get<Movement[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Movement[]>('MovementService => getAll()', null))
    );
  }

  getByMonthAndYear(date: Date): Observable<Movement[]>{
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const url = `${this.movementUrl}` +`?month=`+ month + `&year=` + year;
    return this.http.get<Movement[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Movement[]>('MovementService => getAllByMonth()', null))
    );
  }

  getByMonthAndYearGroupByCategory(date: Date): Observable<Map<string, number>>{
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const url = `${this.movementUrl}` +`?month=`+ month + `&year=` + year + `&groupby=category&type=` + MovementType.EXPENSE;
    return this.http.get<Map<string, number>>(url, this.httpOptions).pipe(
      catchError(this.handleError<Map<string, number>>('MovementService => getAllByMonth()', null))
    );
  }

  getAverageGroupedByCategory(): Observable<Map<string, number>>{
    const url = `${this.movementUrl}` +`?average=true&averageby=MONTHS&limit=3&type=EXPENSE`;
    return this.http.get<Map<string, number>>(url, this.httpOptions).pipe(
      catchError(this.handleError<Map<string, number>>('MovementService => getAllByMonth()', null))
    );
  }
  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
