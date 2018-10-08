import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private formatErrors(error: any) {
    console.log("Error:" + error.error);
    return throwError(error.error);
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body), httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  delete(path, params: HttpParams = new HttpParams()): Observable<any> {
    console.log(`${environment.api_url}${path}`);
    return this.http.delete(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }
}
